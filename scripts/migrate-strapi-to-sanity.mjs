#!/usr/bin/env node
/**
 * Migrate content from Strapi (api.digitl.me) to Sanity (wy74bwq9/production).
 *
 * Transfers:
 *   - Articles (with cover images, author avatars, body blocks including inline images)
 *   - Client Showcases (with covers, logos, body content, successRate, keyTakeaways)
 *
 * Images are downloaded from Strapi and uploaded to Sanity's asset pipeline.
 * Body blocks (Strapi JSON) are converted to Sanity Portable Text.
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/migrate-strapi-to-sanity.mjs
 *
 * Add --dry to preview without writing to Sanity.
 */

import { createClient } from "@sanity/client";

const STRAPI_URL = "https://api.digitl.me";
const SANITY_PROJECT_ID = "wy74bwq9";
const SANITY_DATASET = "production";
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
const DRY_RUN = process.argv.includes("--dry");

if (!SANITY_TOKEN) {
  console.error("❌ Set SANITY_API_TOKEN env var");
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: SANITY_TOKEN,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function strapiAbsoluteUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

async function fetchStrapi(path) {
  const url = `${STRAPI_URL}/${path.replace(/^\//, "")}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Download image from URL, upload to Sanity, return asset document. */
const imageCache = new Map();

async function uploadImageToSanity(imageUrl, filename) {
  if (!imageUrl) return null;
  if (imageCache.has(imageUrl)) return imageCache.get(imageUrl);

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.warn(`  ⚠ Failed to download ${imageUrl}: ${res.status}`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/png";

    if (DRY_RUN) {
      console.log(`  📷 [DRY] Would upload ${filename} (${buffer.length} bytes)`);
      const placeholder = { _type: "image", asset: { _type: "reference", _ref: `image-dry-run-${filename}` } };
      imageCache.set(imageUrl, placeholder);
      return placeholder;
    }

    const asset = await sanity.assets.upload("image", buffer, {
      filename: filename || "image.png",
      contentType,
    });

    const ref = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
    imageCache.set(imageUrl, ref);
    console.log(`  📷 Uploaded ${filename} → ${asset._id}`);
    return ref;
  } catch (err) {
    console.warn(`  ⚠ Image upload failed for ${imageUrl}: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Strapi Blocks → Portable Text conversion
// ---------------------------------------------------------------------------

let blockKeyCounter = 0;
function genKey() {
  return `k${(++blockKeyCounter).toString(36)}`;
}

/** Convert a Strapi text leaf to a Portable Text span. */
function convertSpan(node, markDefs) {
  if (!node || typeof node !== "object") return null;
  if (!("text" in node)) return null;

  const marks = [];
  if (node.bold) marks.push("strong");
  if (node.italic) marks.push("em");
  if (node.underline) marks.push("underline");
  if (node.strikethrough) marks.push("strike-through");
  if (node.code) marks.push("code");

  return { _type: "span", _key: genKey(), text: String(node.text ?? ""), marks };
}

/** Convert Strapi link node to a span + markDef entry. */
function convertLink(node, markDefs) {
  if (!node || node.type !== "link") return null;
  const key = genKey();
  markDefs.push({ _key: key, _type: "link", href: node.url || "#" });

  const children = (node.children || []).map((child) => {
    const span = convertSpan(child, markDefs);
    if (span) span.marks = [...(span.marks || []), key];
    return span;
  }).filter(Boolean);

  return children;
}

/** Convert inline children (spans + links). */
function convertChildren(children, markDefs) {
  if (!Array.isArray(children)) return [{ _type: "span", _key: genKey(), text: "", marks: [] }];

  const result = [];
  for (const child of children) {
    if (!child || typeof child !== "object") continue;
    if ("text" in child) {
      const span = convertSpan(child, markDefs);
      if (span) result.push(span);
    } else if (child.type === "link") {
      const linkSpans = convertLink(child, markDefs);
      if (linkSpans) result.push(...linkSpans);
    }
  }

  return result.length > 0 ? result : [{ _type: "span", _key: genKey(), text: "", marks: [] }];
}

/** Convert a single Strapi block to Portable Text block(s). */
async function convertBlock(block) {
  if (!block || typeof block !== "object") return [];

  const type = block.type;

  switch (type) {
    case "paragraph": {
      const markDefs = [];
      const children = convertChildren(block.children, markDefs);
      return [{ _type: "block", _key: genKey(), style: "normal", markDefs, children }];
    }
    case "heading": {
      const level = Math.min(6, Math.max(1, block.level || 2));
      const markDefs = [];
      const children = convertChildren(block.children, markDefs);
      return [{ _type: "block", _key: genKey(), style: `h${level}`, markDefs, children }];
    }
    case "list": {
      const listType = block.format === "ordered" ? "number" : "bullet";
      const items = [];
      for (const li of (block.children || [])) {
        if (!li || typeof li !== "object") continue;
        // List items can contain paragraphs as children
        for (const inner of (li.children || [])) {
          if (inner.type === "paragraph" || inner.type === "list-item" || "text" in inner) {
            const markDefs = [];
            const children = inner.children
              ? convertChildren(inner.children, markDefs)
              : [{ _type: "span", _key: genKey(), text: String(inner.text ?? ""), marks: [] }];
            items.push({
              _type: "block",
              _key: genKey(),
              style: "normal",
              listItem: listType,
              level: 1,
              markDefs,
              children,
            });
          }
        }
      }
      return items;
    }
    case "quote": {
      const markDefs = [];
      const children = convertChildren(block.children, markDefs);
      return [{ _type: "block", _key: genKey(), style: "blockquote", markDefs, children }];
    }
    case "code": {
      const code = block.plainText || block.code || "";
      return [{ _type: "code", _key: genKey(), code, language: block.language || "text" }];
    }
    case "image": {
      const media = block.image || block.media || block.file;
      const url = strapiMediaUrl(media);
      if (!url) return [];
      const uploaded = await uploadImageToSanity(url, mediaFilename(media));
      if (!uploaded) return [];
      return [{ ...uploaded, _key: genKey(), alt: mediaAlt(media) }];
    }
    case "horizontal-rule":
    case "horizontal_rule":
      // Portable Text doesn't have a native HR — skip or use a custom type
      return [];
    default:
      return [];
  }
}

function strapiMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return strapiAbsoluteUrl(media);
  const attrs = media.attributes || media;
  const url = attrs?.url || attrs?.formats?.large?.url || attrs?.formats?.medium?.url;
  return url ? strapiAbsoluteUrl(url) : null;
}

function mediaFilename(media) {
  if (!media) return "image.png";
  const attrs = media.attributes || media;
  return attrs?.name || "image.png";
}

function mediaAlt(media) {
  if (!media) return "";
  const attrs = media.attributes || media;
  return attrs?.alternativeText || "";
}

/** Convert a dynamic zone rich-text component's body to Portable Text. */
async function convertRichTextBody(body) {
  if (typeof body === "string") {
    // Simple text — wrap in a block
    return [{ _type: "block", _key: genKey(), style: "normal", markDefs: [], children: [{ _type: "span", _key: genKey(), text: body, marks: [] }] }];
  }
  if (!Array.isArray(body)) return [];

  const results = [];
  for (const block of body) {
    const converted = await convertBlock(block);
    results.push(...converted);
  }
  return results;
}

/** Convert an array of Strapi dynamic zone items to Portable Text. */
async function convertDynamicZone(items) {
  if (!Array.isArray(items)) return [];

  const results = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;

    const comp = item.__component;
    if (typeof comp !== "string") {
      // Plain block (not dynamic zone)
      const converted = await convertBlock(item);
      results.push(...converted);
      continue;
    }

    if (comp.includes("rich-text") || comp.includes("richtext")) {
      const body = item.body || item.content || item.text || item.richText || item.copy;
      const converted = await convertRichTextBody(body);
      results.push(...converted);
      continue;
    }

    if (comp.includes("quote")) {
      const body = String(item.body || item.text || item.quote || item.content || "");
      const attribution = item.title || item.author || item.attribution || "";
      results.push({
        _type: "block", _key: genKey(), style: "blockquote", markDefs: [],
        children: [{ _type: "span", _key: genKey(), text: body + (attribution ? ` — ${attribution}` : ""), marks: [] }],
      });
      continue;
    }

    if (comp.includes("media") || comp.includes("image")) {
      const media = item.image || item.media || item.file || item.cover;
      const url = strapiMediaUrl(media);
      if (url) {
        const uploaded = await uploadImageToSanity(url, mediaFilename(media));
        if (uploaded) {
          results.push({ ...uploaded, _key: genKey(), alt: mediaAlt(media) });
        }
      }
      continue;
    }

    if (comp.includes("slider")) {
      const files = item.files || item.images || item.media || item.gallery;
      if (Array.isArray(files)) {
        for (const file of files) {
          const url = strapiMediaUrl(file);
          if (url) {
            const uploaded = await uploadImageToSanity(url, mediaFilename(file));
            if (uploaded) {
              results.push({ ...uploaded, _key: genKey(), alt: mediaAlt(file) });
            }
          }
        }
      }
      continue;
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Article migration
// ---------------------------------------------------------------------------

async function migrateArticles() {
  console.log("\n📝 Fetching articles from Strapi...");

  const json = await fetchStrapi(
    "api/articles?populate[cover][fields][0]=url&populate[cover][fields][1]=alternativeText&populate[cover][fields][2]=name" +
    "&populate[author][fields][0]=name&populate[author][populate][avatar][fields][0]=url&populate[author][populate][avatar][fields][1]=alternativeText&populate[author][populate][avatar][fields][2]=name" +
    "&populate[blocks][on][shared.rich-text]=true&populate[blocks][on][shared.quote]=true" +
    "&populate[blocks][on][shared.media][populate][file][fields][0]=url&populate[blocks][on][shared.media][populate][file][fields][1]=alternativeText&populate[blocks][on][shared.media][populate][file][fields][2]=name" +
    "&populate[blocks][on][shared.slider][populate][files][fields][0]=url&populate[blocks][on][shared.slider][populate][files][fields][1]=alternativeText&populate[blocks][on][shared.slider][populate][files][fields][2]=name" +
    "&populate[keyTakeaways][populate]=*" +
    "&sort=publishedAt:desc&pagination[pageSize]=100"
  );

  const articles = json.data || [];
  console.log(`  Found ${articles.length} articles`);

  for (const article of articles) {
    console.log(`\n  → "${article.title}" (slug: ${article.slug})`);

    // Upload cover
    let cover = null;
    if (article.cover) {
      const coverUrl = strapiMediaUrl(article.cover);
      if (coverUrl) {
        cover = await uploadImageToSanity(coverUrl, mediaFilename(article.cover));
      }
    }

    // Upload author avatar
    let authorAvatar = null;
    if (article.author?.avatar) {
      const avatarUrl = strapiMediaUrl(article.author.avatar);
      if (avatarUrl) {
        authorAvatar = await uploadImageToSanity(avatarUrl, mediaFilename(article.author.avatar));
      }
    }

    // Convert blocks (dynamic zone) to Portable Text
    const blocks = await convertDynamicZone(article.blocks || []);

    // Key takeaways
    const keyTakeaways = (article.keyTakeaways || []).map((kt) => ({
      _type: "keyTakeaway",
      _key: genKey(),
      title: kt.title || kt.Title || "",
      description: kt.description || kt.Description || kt.subtitle || "",
    }));

    const doc = {
      _type: "article",
      _id: `article-${article.slug}`,
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      description: article.description || null,
      excerpt: article.excerpt || null,
      subtitle: article.subtitle || article.subTitle || null,
      publishedAt: article.publishedAt || article.createdAt,
      cover: cover || undefined,
      author: article.author ? {
        _type: "author",
        name: article.author.name || null,
        avatar: authorAvatar || undefined,
      } : undefined,
      blocks,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
    };

    if (DRY_RUN) {
      console.log(`  📄 [DRY] Would create article "${doc.title}" (${doc._id})`);
      console.log(`     blocks: ${blocks.length}, keyTakeaways: ${keyTakeaways.length}`);
    } else {
      await sanity.createOrReplace(doc);
      console.log(`  ✅ Created article: ${doc._id}`);
    }
  }

  return articles.length;
}

// ---------------------------------------------------------------------------
// Client showcase migration
// ---------------------------------------------------------------------------

async function migrateShowcases() {
  console.log("\n🏢 Fetching client showcases from Strapi...");

  const json = await fetchStrapi("api/client-showcases?populate=*&sort=publishedAt:desc&pagination[pageSize]=100");
  const showcases = json.data || [];
  console.log(`  Found ${showcases.length} showcases`);

  for (const showcase of showcases) {
    console.log(`\n  → "${showcase.title}" (slug: ${showcase.slug})`);

    // Upload cover
    let coverPhoto = null;
    const coverField = showcase.coverPhoto || showcase.cover || showcase.coverImage;
    if (coverField) {
      const coverUrl = strapiMediaUrl(coverField);
      if (coverUrl) {
        coverPhoto = await uploadImageToSanity(coverUrl, mediaFilename(coverField));
      }
    }

    // Upload client logo
    let clientLogo = null;
    const logoField = showcase.clientLogo || showcase.logo;
    if (logoField) {
      const logoUrl = strapiMediaUrl(logoField);
      if (logoUrl) {
        clientLogo = await uploadImageToSanity(logoUrl, mediaFilename(logoField));
      }
    }

    // Convert content blocks to Portable Text
    const content = await convertDynamicZone(showcase.content || []);

    // Category
    const category = typeof showcase.category === "object"
      ? (showcase.category?.name || null)
      : (typeof showcase.category === "string" ? showcase.category : null);

    // Success rate
    const successRate = (Array.isArray(showcase.successRate) ? showcase.successRate : []).map((sr) => ({
      _type: "successRateItem",
      _key: genKey(),
      title: sr.title || sr.Title || sr.value || sr.metric || "",
      subtitle: sr.subtitle || sr.subTitle || sr.description || sr.label || "",
    }));

    // Key takeaways
    const keyTakeaways = (showcase.keyTakeaways || []).map((kt) => ({
      _type: "keyTakeaway",
      _key: genKey(),
      title: kt.title || kt.Title || "",
      description: kt.description || kt.Description || kt.subtitle || "",
    }));

    const doc = {
      _type: "clientShowcase",
      _id: `showcase-${showcase.slug}`,
      title: showcase.title,
      slug: { _type: "slug", current: showcase.slug },
      description: showcase.description || null,
      clientName: showcase.clientName || null,
      clientWebsite: showcase.clientWebsite || showcase.website || null,
      category: category,
      publishedAt: showcase.publishedAt || showcase.createdAt,
      coverPhoto: coverPhoto || undefined,
      clientLogo: clientLogo || undefined,
      content,
      successRate: successRate.length > 0 ? successRate : undefined,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
    };

    if (DRY_RUN) {
      console.log(`  📄 [DRY] Would create showcase "${doc.title}" (${doc._id})`);
      console.log(`     content blocks: ${content.length}, successRate: ${successRate.length}, keyTakeaways: ${keyTakeaways.length}`);
    } else {
      await sanity.createOrReplace(doc);
      console.log(`  ✅ Created showcase: ${doc._id}`);
    }
  }

  return showcases.length;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🚀 Strapi → Sanity migration");
  console.log(`   Strapi:  ${STRAPI_URL}`);
  console.log(`   Sanity:  ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
  if (DRY_RUN) console.log("   ⚠ DRY RUN — no data will be written\n");

  const articleCount = await migrateArticles();
  const showcaseCount = await migrateShowcases();

  console.log(`\n✅ Migration complete: ${articleCount} articles, ${showcaseCount} showcases`);
  if (DRY_RUN) console.log("   (dry run — nothing was actually written)");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
