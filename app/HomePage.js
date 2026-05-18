"use client";

import { motion } from "framer-motion";
import ClientsLogosCarousel from "./components/ClientsLogosCarousel";
import ContactForm from "./components/ContactForm";
import CtaWithImageBackground from "./components/CtaWithImageBackground";
import DesignJourneyTable from "./components/DesignJourneyTable";
import Faq from "./components/Faq";
import JournalList from "./components/JournalList";
import LinkCard from "./components/LinkCard";
import PhoneInHand from "./components/PhoneInHand";
import PricingPlans from "./components/PricingPlans";
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
import Title from "./components/Title";
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
      <HeroCard primaryCtaHref="/contact" headlineLines={["I create websites that work as hard as you do"]} />
        <ClientsLogosCarousel title="Proudly worked with:" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="My work"
            subtitle="Check out some of my favorite & most recent projects."
          />
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="My services"
            subtitle="Here’s how I can help bring your vision to life:"
          />
        </motion.div>
        <div className={styles.servicesList}>
          {services.map(({ key, title, description, Icon }) => (
            <ServiceItem
              key={key}
              icon={<Icon />}
              title={title}
              description={description}
            />
          ))}
        </div>
        <StepProcess />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="My toolkit, your advantage"
            subtitle="See how my expertise with these tools drives better results."
          />
        </motion.div>

        <ToolsList />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Years />
          <div className={styles.journeyContainer}>
            <h3 className={styles.journeyTitleTitle}>My journey through design</h3>
            <p className={styles.journeyTitleSubtitle}>Explore the milestones and experiences that have shaped my career, year by year.</p>
          </div>
        </motion.div>
        <DesignJourneyTable />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="Words from my clients"
            subtitle="<b>Loved by those</b> <br> who value thoughtful design."
            hasImage={true}
          />
        </motion.div>

        <PhoneInHand />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="Flexible plans for every need"
            subtitle="Whether you’re starting fresh or need a complete overhaul, choose the plan that fits your project."
          />
        </motion.div>
        <PricingPlans />
        <Faq />
        <CtaWithImageBackground />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            width={500}
            title="Journal"
            subtitle="A space where I share updates, insights, and reflections on design, creativity, and growth."
          />
        </motion.div>
        <JournalList
          items={articles.map((a) => ({
            slug: a.slug,
            title: a.title,
            publishedAt: a.publishedAt,
            imageUrl: a.coverUrl,
          }))}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.titleContainer}
        >
          <Title
            title="Join 150+ professionals elevating their brand"
            subtitle="Discover design insights, project updates, and tips to elevate your work straight to your inbox."
            width={600}
          />
        </motion.div>
        <ClientsLogosCarousel marginTop={60} marginBottom={60} />

        <Subscribe />
        <AvatarInfo />
        <ContactForm />
      </main>
    </div>
  );
}
