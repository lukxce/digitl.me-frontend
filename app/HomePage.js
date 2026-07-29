"use client";

import AvatarInfo from "./components/AvatarInfo";
import ClientsLogosCarousel from "./components/ClientsLogosCarousel";
import ContactForm from "./components/ContactForm";
import Faq from "./components/Faq";
import HeroCard from "./components/HeroCard";
import JournalList from "./components/JournalList";
import LinkCard from "./components/LinkCard";
import MotionTitleBlock from "./components/MotionTitleBlock";
import PhoneInHand from "./components/PhoneInHand";
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
import styles from "./page.module.css";

const services = [
  {
    key: "paid-advertising",
    title: "Paid Advertising (Search & Social)",
    description:
      "Campaigns on Google and social, built and scaled to drive sales, not just clicks.",
    Icon: IconProduct,
  },
  {
    key: "web-design",
    title: "Website Design & Development",
    description:
      "Fast sites built to convert, turning the traffic you pay for into customers.",
    Icon: IconWeb,
  },
  {
    key: "seo",
    title: "Search Engine Optimization (SEO)",
    description:
      "Be first where your customers search, on Google and in AI search.",
    Icon: IconStrategy,
  },
  {
    key: "social",
    title: "Social Content & Presence",
    description:
      "On-brand social that feeds your other channels, not an island of its own.",
    Icon: IconMotion,
  },
  {
    key: "branding",
    title: "Branding & Visual Identity",
    description:
      "The positioning and visual system underneath it all, so you read as one brand.",
    Icon: IconBrand,
  },
];

export default function HomePage({ articles = [], showcases = [] }) {
  return (
    <div className={styles.page}>
      <main className={styles.main} data-article-count={articles.length}>
        <HeroCard
          primaryCtaHref="/contact"
          secondaryCtaHref="/#what-we-do"
          headlineLines={["Where marketing meets real business results."]}
        />
        <ScrollReveal>
          <ClientsLogosCarousel title="Trusted by:" />
        </ScrollReveal>

        <MotionTitleBlock
          title="Work that speaks for itself"
          subtitle="From strategy to execution, here's what that looks like in practice."
          subtitleWidthMobile={200}
          className={styles.titleContainer}
          marginTop={10}
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

        <div id="what-we-do" style={{ scrollMarginTop: "20px" }}>
          <MotionTitleBlock
            title="What we do"
            subtitle="The full marketing function, handled as one system, not a menu of disconnected services."
            className={styles.titleContainer}
            subtitleWidth={220}
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
        </div>

        <ScrollReveal>
          <StepProcess />
        </ScrollReveal>

        {/* <MotionTitleBlock
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
            <h2 className={styles.journeyTitleTitle}>My journey through design</h2>
            <p className={styles.journeyTitleSubtitle}>
              Explore the milestones and experiences that have shaped my career,
              year by year.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <DesignJourneyTable />
        </ScrollReveal> */}

        <MotionTitleBlock
          title="Trusted by our clients"
          subtitle="What it's like to work with us."
          hasImage={true}
          width={520}
          className={styles.titleContainer}
        />

        <PhoneInHand />

        {/* <MotionTitleBlock
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
        </ScrollReveal> */}

        <div id="faq">
          <ScrollReveal>
            <Faq />
          </ScrollReveal>
        </div>

        {/* <CtaWithImageBackground /> */}

        <MotionTitleBlock
          width={500}
          title="Journal"
          subtitle="Practical thinking on marketing, growth, and building brands that move numbers."
          subtitleWidth={310}
          subtitleWidthMobile={300}
          marginTop={80}
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
          title="Join 150+ operators growing their brand"
          subtitle="Marketing notes, campaign breakdowns, and what's actually working right now. Unsubscribe anytime."
          width={600}
          subtitleWidth={425}
          subtitleWidthMobile={350}
          className={styles.titleContainer}
        />

        <ScrollReveal>
          <ClientsLogosCarousel />
        </ScrollReveal>

        <ScrollReveal>
          <Subscribe />
        </ScrollReveal>

        <ScrollReveal style={{ scrollMarginTop: "0px" }}>
          <AvatarInfo />
        </ScrollReveal>

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>
      </main>
    </div>
  );
}
