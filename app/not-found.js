import { tryGetArticlesForHome } from "../lib/articles.js";
import { tryGetClientShowcases } from "../lib/clientShowcases.js";
import AvatarInfo from "./components/AvatarInfo";
import ClientsLogosCarousel from "./components/ClientsLogosCarousel";
import ContactForm from "./components/ContactForm";
import JournalArticleContent from "./components/JournalArticleContent";
import JournalList from "./components/JournalList";
import LinkCard from "./components/LinkCard";
import MotionTitleBlock from "./components/MotionTitleBlock";
import NotFoundShowcaseHeader from "./components/NotFoundShowcaseHeader";
import Subscribe from "./components/Subscribe";
import innerStyles from "./innerPage.module.css";

export const metadata = {
  title: "Page not found",
};

export default async function NotFound() {
  const [articles, showcases] = await Promise.all([
    tryGetArticlesForHome(10),
    tryGetClientShowcases(10),
  ]);

  const moreArticles = articles.slice(0, 3).map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    publishedAt: entry.publishedAt,
    imageUrl: entry.coverUrl,
  }));

  const moreProjects = showcases.slice(0, 3);

  return (
    <main className={innerStyles.pageProject}>
      <JournalArticleContent
        title="Page not found"
        showTitle={false}
        backHref="/"
        lead={<NotFoundShowcaseHeader />}
        backLabel={false}
      >
      </JournalArticleContent>



      <MotionTitleBlock
        title="Join 150+ professionals elevating their brand"
        subtitle="Discover design insights, project updates, and tips to elevate your work straight to your inbox."
        className={innerStyles.titleContainer}
        width={600}
        subtitleWidth={425}
      />
      <ClientsLogosCarousel />
      <Subscribe />
      <AvatarInfo />
      <ContactForm />
    </main>
  );
}
