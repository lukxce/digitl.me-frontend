import { PAGES } from "../_services/content";
import { SERVICE_SLUGS, SERVICES_UPDATED } from "../_services/slugs";
import { plain } from "../_services/Rich";

const SITE = "https://www.digitl.me";

/* A plain-text map of the site for AI assistants (llms.txt): who Digitl is,
   the service pages with their one-paragraph summary and starting price,
   and the case studies. Built from the same copy the pages use. */
export const dynamic = "force-static";

export function GET() {
  const services = SERVICE_SLUGS.map((slug) => {
    const p = PAGES[slug];
    // the monthly unit may still be the Serbian key, which reads "a month"
    const per = p.price?.per
      ? /^mese/i.test(p.price.per)
        ? "a month"
        : p.price.per
      : "";
    const price = p.price?.from
      ? ` From €${p.price.from}${per ? ` ${per}` : ""}.`
      : "";
    return `- [${p.h1}](${SITE}/services/${slug}): ${plain(p.lead)}${price}`;
  }).join("\n");
  const body = `# Digitl

> Digitl runs your whole marketing function as one system: paid, web, SEO, social, and brand. Led by operators who've scaled companies, not just campaigns.

Contact: hello@digitl.me, (+386) 41 962 522. Serbian site: https://www.digitl.rs

## Services

${services}

## Projects

- [Pando Cleaning Solutions, a cleaning company in Jacksonville, FL](${SITE}/projects/pando-cleaning)

Updated: ${SERVICES_UPDATED}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
