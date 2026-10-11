import { tryGetArticlesForHome } from "../../lib/cms.js";
import { countCategories } from "../_blog/categories";
import Listing from "../_blog/Listing";
import { toCard } from "../_blog/util";
import { sans } from "../_home/font";
import Shell from "../_home/Shell";

export const revalidate = 60;

export const metadata = {
  title: "Journal",
  description:
    "The Digitl Journal: articles on marketing, growth, and building brands that stand out.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const articles = (await tryGetArticlesForHome(100)).map(toCard);
  return (
    <Shell fonts={sans.variable}>
      <Listing articles={articles} categories={countCategories(articles)} />
    </Shell>
  );
}
