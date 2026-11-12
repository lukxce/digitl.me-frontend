/* The service pages' copy, one module per page, keyed by slug. */
import aiAutomation from "./ai-automation";
import branding from "./branding";
import webDesign from "./web-design";
import paidAdvertising from "./paid-advertising";
import seo from "./seo";
import socialMediaManagement from "./social-media-management";

export const PAGES = Object.fromEntries(
  [
    paidAdvertising,
    seo,
    webDesign,
    socialMediaManagement,
    branding,
    aiAutomation,
  ].map((p) => [p.slug, p]),
);
