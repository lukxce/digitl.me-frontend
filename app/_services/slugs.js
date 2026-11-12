/* The service pages, in the homepage's order (ads, SEO, web, social,
   brand), then AI and automation, which the homepage's cards don't carry.
   Plain data so the sitemap can import it without pulling page code in. */
export const SERVICE_SLUGS = [
  "paid-advertising",
  "seo",
  "web-design",
  "social-media-management",
  "branding",
  "ai-automation",
];

/* When the service pages' copy last changed. Shown on the pages ("Updated"),
   in their structured data and in the sitemap; bump it with each copy round. */
export const SERVICES_UPDATED = "2026-11-12";
