import { extractContentHeadings } from "./blockHeadings.js";

/**
 * @typedef {{ id: string; label: string }} PageOutlineItem
 */

/**
 * @param {{
 *   hasKeyTakeaways?: boolean;
 *   contentBlocks?: unknown;
 * }} options
 * @returns {PageOutlineItem[]}
 */
export function buildJournalOutline({
  hasKeyTakeaways = false,
  contentBlocks = null,
}) {
  const items = [];

  if (hasKeyTakeaways) {
    items.push({ id: "key-takeaways", label: "Key Takeaways" });
  }

  items.push(...extractContentHeadings(contentBlocks));
  return items;
}

/**
 * @param {{
 *   title: string;
 *   hasSuccessRate?: boolean;
 *   hasKeyTakeaways?: boolean;
 *   contentBlocks?: unknown;
 * }} options
 * @returns {PageOutlineItem[]}
 */
export function buildShowcaseOutline({
  title,
  hasSuccessRate = false,
  hasKeyTakeaways = false,
  contentBlocks = null,
}) {
  const items = [];

  if (hasSuccessRate) {
    items.push({ id: "success-metrics", label: "Success metrics" });
  }

  if (hasKeyTakeaways) {
    items.push({ id: "key-takeaways", label: "Key Takeaways" });
  }

  if (typeof title === "string" && title.trim().length > 0) {
    items.push({ id: "project-overview", label: title.trim() });
  }

  items.push(...extractContentHeadings(contentBlocks));
  return items;
}
