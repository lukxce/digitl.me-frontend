import MotionTitleBlock from "../components/MotionTitleBlock";
import styles from "../innerPage.module.css";
import LinkCard from "../components/LinkCard";
import ClientsLogosCarousel from "../components/ClientsLogosCarousel";
import Subscribe from "../components/Subscribe";
import ContactForm from "../components/ContactForm";
import { tryGetClientShowcases } from "../../lib/clientShowcases.js";
import AvatarInfo from "../components/AvatarInfo";

export const metadata = {
  title: "Projects",
  description: "Selected work and experiments.",
};

export default async function ProjectsPage() {
  const workCards = await tryGetClientShowcases();

  return (
    <main className={styles.page}>
      <MotionTitleBlock
        title="My work"
        subtitle="Check out some of my favorite & most recent projects."
        className={styles.titleContainer}
        width={300}
        subtitleWidthMobile={200}
      />
      <div className={styles.cardColumn}>
        {workCards.map((card) => (
          <LinkCard
            key={card.id ?? card.title}
            href={card.href}
            backgroundSrc={card.backgroundSrc}
            backgroundAlt={card.backgroundAlt}
            thumbSrc={card.thumbSrc}
            thumbAlt={card.thumbAlt}
            title={card.title}
            subtitle={card.subtitle}
          />
        ))}
      </div>
      <MotionTitleBlock
        title="Join 150+ professionals elevating their brand"
        subtitle="Discover design insights, project updates, and tips to elevate your work straight to your inbox."
        className={styles.titleContainer}
        width={600}
        subtitleWidth={425}
        subtitleWidthMobile={350}
      />
      <ClientsLogosCarousel />
      <Subscribe />
      <AvatarInfo />
      <ContactForm />
    </main>
  );
}
