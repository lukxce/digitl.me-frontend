import MotionTitleBlock from "../components/MotionTitleBlock";
import ScrollReveal from "../components/ScrollReveal";
import styles from "../innerPage.module.css";
import JournalList from "../components/JournalList";
import { tryGetArticlesForHome } from "../../lib/articles";
import ClientsLogosCarousel from "../components/ClientsLogosCarousel";
import Subscribe from "../components/Subscribe";
import ContactForm from "../components/ContactForm";
import AvatarInfo from "../components/AvatarInfo";

export const metadata = {
  title: "Journal",
  description: "Notes, updates, and longer-form writing.",
};

export default async function JournalPage() {
  const articles = await tryGetArticlesForHome(10);
  return (
    <main className={`${styles.page}`.trim()}>
      <MotionTitleBlock
        title="Journal"
        subtitle="A space where I share updates, insights, and reflections on design, creativity, and growth. "
        className={styles.titleContainer}
        width={500}
        subtitleWidthMobile={300}
      />
      {articles.length > 0 && <JournalList
          limit={700}
          hasLink={false} 
          items={articles.map((a) => ({
            slug: a.slug,
            title: a.title,
            publishedAt: a.publishedAt,
            imageUrl: a.coverUrl,
          }))}
        />}

      <MotionTitleBlock
        title="Join 150+ professionals elevating their brand"
        subtitle="Discover design insights, project updates, and tips to elevate your work straight to your inbox."
        className={styles.titleContainer}
        width={600}
        subtitleWidth={425}
      />
      <ScrollReveal>
        <ClientsLogosCarousel />
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <Subscribe />
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <AvatarInfo />
      </ScrollReveal>
      <ScrollReveal delay={0.24}>
        <ContactForm />
      </ScrollReveal>
    </main>
  );
}
