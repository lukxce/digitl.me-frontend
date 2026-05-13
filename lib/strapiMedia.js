/** @param {Record<string, unknown>} attrs */
function pickMediaUrl(attrs) {
  return (
    (typeof attrs?.url === "string" && attrs.url) ||
    (typeof attrs?.formats?.large?.url === "string" &&
      attrs.formats.large.url) ||
    (typeof attrs?.formats?.medium?.url === "string" &&
      attrs.formats.medium.url) ||
    (typeof attrs?.formats?.small?.url === "string" &&
      attrs.formats.small.url) ||
    (typeof attrs?.formats?.thumbnail?.url === "string" &&
      attrs.formats.thumbnail.url) ||
    null
  );
}

/**
 * Resolve Strapi REST media objects or relative upload paths to absolute URLs.
 * @param {unknown} media
 * @returns {string | null}
 */
export function strapiMediaUrl(media) {
  if (media == null) return null;
  if (typeof media === "string") return toAbsoluteStrapiUrl(media);
  if (typeof media !== "object") return null;

  const direct = media.attributes ?? media;
  const directUrl = pickMediaUrl(direct);
  if (directUrl) return toAbsoluteStrapiUrl(directUrl);

  const data = media.data;
  const node = Array.isArray(data) ? data[0] : data;
  if (!node || typeof node !== "object") return null;
  const attrs = node.attributes ?? node;
  const url = pickMediaUrl(attrs);
  if (!url) return null;
  return toAbsoluteStrapiUrl(url);
}

/**
 * @param {string} url
 * @returns {string}
 */
export function toAbsoluteStrapiUrl(url) {
  if (url.startsWith("http")) return url;
  const base = process.env.STRAPI_URL?.replace(/\/$/, "") ?? "";
  return base ? `${base}${url.startsWith("/") ? url : `/${url}`}` : url;
}
