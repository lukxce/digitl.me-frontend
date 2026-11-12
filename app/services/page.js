import { sans } from "../_home/font";
import Shell from "../_home/Shell";
import Hub from "../_services/Hub";

const URL = "https://www.digitl.me/services";

export const metadata = {
  title: {
    absolute: "Digital marketing services | Digitl",
  },
  description:
    "Paid advertising, SEO, web design, social media management, branding and business automation. See what each service includes.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: URL,
    type: "website",
    images: [
      {
        url: "/og/services.png",
        width: 1200,
        height: 630,
        alt: "Digital marketing services",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og/services.png"] },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.digitl.me",
    },
    { "@type": "ListItem", position: 2, name: "Services", item: URL },
  ],
};

export default function ServicesPage() {
  return (
    <Shell fonts={sans.variable}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />
      <Hub />
    </Shell>
  );
}
