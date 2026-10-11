/* Helpers shared by the blog listing and the article page. Dates and reading
   times are worked out on the server and handed down as plain strings, so
   the browser never formats them again and cannot disagree with the server. */

import { categoryOf } from "./categories";

export const SITE_URL = "https://www.digitl.me";

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "16 Aug 2026" */
export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : DATE.format(d);
}

/** A block's words: a Markdown body, or the spans of a Portable Text block
    (the shape this site's CMS stores). */
function blockText(x) {
  if (typeof x?.body === "string") return x.body;
  return Array.isArray(x?.children)
    ? x.children
        .map((c) => (typeof c?.text === "string" ? c.text : ""))
        .join("")
    : "";
}

/** Words in the rich-text bodies / 200, rounded, never under a minute. */
export function readingMinutes(blocks) {
  const text =
    typeof blocks === "string"
      ? blocks
      : Array.isArray(blocks)
        ? blocks.map(blockText).join(" ")
        : "";
  const words = text.split(/\s+/).filter(Boolean).length;
  return words ? Math.max(1, Math.round(words / 200)) : null;
}

/* ── images ───────────────────────────────────────────────────────────── */
const SANITY = /^https:\/\/cdn\.sanity\.io\/images\//;

/** A Sanity image at a given width as WebP; anything else is left alone. */
export function img(url, w, q = 80) {
  if (!url) return null;
  if (!SANITY.test(url)) return url;
  return `${url.split("?")[0]}?w=${w}&fit=max&fm=webp&q=${q}`;
}

export function imgSet(url, widths, q) {
  if (!url || !SANITY.test(url)) return undefined;
  return widths.map((w) => `${img(url, w, q)} ${w}w`).join(", ");
}

/** Sanity writes the pixel size into the file name: …-1600x900.png */
export function imgSize(url) {
  const m = /-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i.exec(url ?? "");
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

/* ── what a card needs, and nothing else ──────────────────────────────── */
const text = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");

export function toCard(a) {
  return {
    slug: a.slug,
    href: `/journal/${encodeURIComponent(a.slug)}`,
    title: a.title,
    category: categoryOf(a),
    description: text(a.description) || text(a.excerpt) || text(a.subtitle),
    date: formatDate(a.publishedAt),
    iso: a.publishedAt ?? null,
    minutes: readingMinutes(a.blocks),
    cover: a.coverUrl ?? null,
    author: a.author?.name ?? null,
    avatar: img(a.author?.imageUrl, 96),
  };
}

/* ── words ────────────────────────────────────────────────────────────── */
/** 1 article, 2 articles. (The name is the Serbian original's.) */
export function tekstova(n) {
  return `${n} ${n === 1 ? "article" : "articles"}`;
}

/** Lower case without diacritics, so "sta" finds "Šta" and "dj" finds "đ". */
export function fold(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** A heading as an id: "Šta zapravo dobijaš danas" → "sta-zapravo-dobijas-danas". */
export function slug(s) {
  return fold(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
