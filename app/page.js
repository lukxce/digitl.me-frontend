import { tryGetArticlesForHome } from "../lib/articles.js";
import { tryGetClientShowcases } from "../lib/clientShowcases.js";
import HomePage from "./HomePage";

export default async function Home() {
  const [articles, showcases] = await Promise.all([
    tryGetArticlesForHome(10),
    tryGetClientShowcases(4),
  ]);
  return <HomePage articles={articles} showcases={showcases} />;
}
