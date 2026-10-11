import { tryGetArticlesForHome, tryGetClientShowcases } from "../../lib/cms.js";
import HomePage from "../HomePage";

export const revalidate = 60;

/* The original homepage design, parked at /v2 (it was at /v2home, which
   now redirects here). Kept out of the index so it cannot compete with
   the homepage it came from. */
export const metadata = { robots: { index: false, follow: false } };

export default async function Home() {
  const [articles, showcases] = await Promise.all([
    tryGetArticlesForHome(10),
    tryGetClientShowcases(4),
  ]);
  return <HomePage articles={articles} showcases={showcases} />;
}
