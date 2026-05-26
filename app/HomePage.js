"use client";

import ClientsLogosCarousel from "./components/ClientsLogosCarousel";
import ContactForm from "./components/ContactForm";
import CtaWithImageBackground from "./components/CtaWithImageBackground";
import DesignJourneyTable from "./components/DesignJourneyTable";
import Faq from "./components/Faq";
import JournalList from "./components/JournalList";
import LinkCard from "./components/LinkCard";
import MotionTitleBlock from "./components/MotionTitleBlock";
import PhoneInHand from "./components/PhoneInHand";
import PricingPlans from "./components/PricingPlans";
import ScrollReveal from "./components/ScrollReveal";
import ServiceItem from "./components/ServiceItem";
import StepProcess from "./components/StepProcess";
import Subscribe from "./components/Subscribe";
import {
  IconBrand,
  IconMotion,
  IconProduct,
  IconStrategy,
  IconWeb,
} from "./components/serviceIcons";
import ToolsList from "./components/ToolsList";
import Years from "./components/Years";
import styles from "./page.module.css";
import HeroCard from "./components/HeroCard";
import AvatarInfo from "./components/AvatarInfo";

const services = [
  {
    key: "product",
    title: "Product design",
    description:
      "End-to-end flows, prototypes, and UI systems so your product feels clear, fast, and trustworthy from first use to power features.",
    Icon: IconProduct,
  },
  {
    key: "brand",
    title: "Brand & identity",
    description:
      "Visual language, typography, and art direction that tell a consistent story across web, print, and social touchpoints.",
    Icon: IconBrand,
  },
  {
    key: "web",
    title: "Web experiences",
    description:
      "Marketing sites and product surfaces built with performance, accessibility, and responsive layouts in mind.",
    Icon: IconWeb,
  },
  {
    key: "motion",
    title: "Motion & interaction",
    description:
      "Micro-interactions and motion specs that guide attention, explain hierarchy, and make interfaces feel alive without noise.",
    Icon: IconMotion,
  },
  {
    key: "strategy",
    title: "Design strategy",
    description:
      "Workshops, audits, and roadmaps that align stakeholders on priorities before pixels, so execution stays focused.",
    Icon: IconStrategy,
  },
];

export default function HomePage({ articles = [], showcases = [] }) {
  return (
    <div className={styles.page}>
      <main className={styles.main} data-article-count={articles.length}>
        <HeroCard
          primaryCtaHref="/contact"
          headlineLines={["I create websites that work as hard as you do"]}
        />
        <ScrollReveal>
          <ClientsLogosCarousel title="Proudly worked with:" />
        </ScrollReveal>

        <MotionTitleBlock
          title="My work"
          subtitle="Check out some of my favorite & most recent projects."
          subtitleWidthMobile={200}
          className={styles.titleContainer}
        />

        <div className={styles.cardColumn}>
          {showcases.map((card) => (
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
          title="My services"
          subtitle="Here’s how I can help bring your vision to life:"
          className={styles.titleContainer}
          widthMobile={200}
        />

        <div className={styles.servicesList}>
          {services.map(({ key, title, description, Icon }, index) => (
            <ScrollReveal key={key} delay={index * 0.08}>
              <ServiceItem
                icon={<Icon />}
                title={title}
                description={description}
                initialOpen={index === 0}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <StepProcess />
        </ScrollReveal>

        <MotionTitleBlock
          title="My toolkit, your advantage"
          subtitle="See how my expertise with these tools drives better results."
          className={styles.titleContainer}
        />

        <ScrollReveal>
          <ToolsList />
        </ScrollReveal>

        <ScrollReveal>
          <Years />
          <div className={styles.journeyContainer}>
            <h3 className={styles.journeyTitleTitle}>My journey through design</h3>
            <p className={styles.journeyTitleSubtitle}>
              Explore the milestones and experiences that have shaped my career,
              year by year.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <DesignJourneyTable />
        </ScrollReveal>

        <MotionTitleBlock
          title="Words from my clients"
          subtitle="<b>Loved by those</b> <br> who value thoughtful design."
          hasImage={true}
          className={styles.titleContainer}
        />

        <PhoneInHand />

        <MotionTitleBlock
          title="Flexible plans for every need"
          subtitle="Whether you’re starting fresh or need a complete overhaul, choose the plan that fits your project."
          width={425}
          subtitleWidth={350}
          widthMobile={300}
          subtitleWidthMobile={350}
          className={styles.titleContainer}
        />

        <ScrollReveal>
          <PricingPlans />
        </ScrollReveal>

        <ScrollReveal>
          <Faq />
        </ScrollReveal>

        <CtaWithImageBackground />

        <MotionTitleBlock
          width={500}
          title="Journal"
          subtitle="A space where I share updates, insights, and reflections on design, creativity, and growth."
          subtitleWidthMobile={300}
          className={styles.titleContainer}
        />

        <JournalList
          items={articles.map((a) => ({
            slug: a.slug,
            title: a.title,
            publishedAt: a.publishedAt,
            imageUrl: a.coverUrl,
          }))}
        />

        <MotionTitleBlock
          title="Join 150+ professionals elevating their brand"
          subtitle="Discover design insights, project updates, and tips to elevate your work straight to your inbox."
          width={600}
          subtitleWidth={425}
          subtitleWidthMobile={350}
          className={styles.titleContainer}
        />

        <ScrollReveal>
          <ClientsLogosCarousel marginTop={60} marginBottom={60} />
        </ScrollReveal>

        <ScrollReveal>
          <Subscribe />
        </ScrollReveal>

        <ScrollReveal>
          <AvatarInfo />
        </ScrollReveal>

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>
      </main>
    </div>
  );
}
