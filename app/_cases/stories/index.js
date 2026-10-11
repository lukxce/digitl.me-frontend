/* Case studies that have a full story (chapters, measured numbers, charts)
   written for this design, keyed by the Sanity slug. None yet on digitl.me:
   every project falls back to its Sanity text. Add a file here and list it
   below to give one a full story. */
const STORIES = {};

export function getStory(slug) {
  return STORIES[slug] ?? null;
}
