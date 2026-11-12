import { getClients } from "./_home/data";
import { sans } from "./_home/font";
import { SERVICE_PAGES } from "./_home/content";
import HomeV5 from "./_home/HomeV5";

export const revalidate = 60;

/* Title and description come from the layout, which carries the site's
   real ones. The previous homepages live on, out of the index, at /v2
   (the original) and /v3 (the bento). */
export const metadata = { alternates: { canonical: "/" } };

/* Who Digitl is, for search engines and AI answers: one name, one phone,
   one email, the same profiles everywhere. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.digitl.me/#organization",
  name: "Digitl",
  url: "https://www.digitl.me",
  logo: "https://www.digitl.me/icon.png",
  email: "hello@digitl.me",
  telephone: "+38641962522",
  description:
    "Digitl runs your whole marketing function as one system: paid, web, SEO, social, and brand. Led by operators who've scaled companies, not just campaigns.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+38641962522",
    email: "hello@digitl.me",
    availableLanguage: ["en", "sr"],
  },
  // the six services, each with its own page
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital marketing services",
    itemListElement: SERVICE_PAGES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.footer,
        url: `https://www.digitl.me${s.page}`,
      },
    })),
  },
  sameAs: [
    "https://www.instagram.com/digitl.me",
    "https://www.linkedin.com/company/digitl-rs",
    "https://x.com/digitl_rs",
    "https://www.digitl.rs",
  ],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.digitl.me/#website",
  name: "Digitl",
  url: "https://www.digitl.me",
  inLanguage: "en",
  publisher: { "@id": "https://www.digitl.me/#organization" },
};

export default async function Home() {
  const clients = await getClients();
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([ORGANIZATION, WEBSITE]),
        }}
      />
      <HomeV5 clients={clients} fonts={sans.variable} />
    </>
  );
}
