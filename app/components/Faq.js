"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import {
  scrollRevealDistance,
  scrollRevealDuration,
  scrollRevealEase,
  scrollRevealStagger,
  scrollRevealStaggerDelay,
  scrollRevealViewport,
} from "../../lib/scrollReveal";
import ScrollReveal from "./ScrollReveal";
import Title from "./Title";
import styles from "./Faq.module.css";

const easeOut = [0.22, 1, 0.36, 1];

const faqListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: scrollRevealStagger,
      delayChildren: scrollRevealStaggerDelay,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: scrollRevealDistance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: scrollRevealDuration, ease: scrollRevealEase },
  },
};

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Most website and product design projects run 6–12 weeks depending on scope, review cycles, and how many surfaces are in the first release. I share a week-by-week plan after the kickoff so you always know what to expect.",
  },
  {
    question: "Do you work with clients in other time zones?",
    answer:
      "Yes. I keep a few predictable hours of overlap for live calls and use async updates the rest of the time. That way you get clear progress on Figma, Loom, and shared docs without late-night meetings for either of us.",
  },
  {
    question: "How do you hand off designs to development?",
    answer:
      "Handoff includes organized Figma files, component states, spacing and type notes, and exportable assets. I can also sit in on a short dev sync to walk through edge cases and keep the build aligned with the spec.",
  },
  {
    question: "What is included in a standard engagement?",
    answer:
      "A standard project usually covers discovery, IA and key user flows, high-fidelity UI, a small set of responsive patterns, and one or two revision rounds. Add-ons like design system work, motion, or content help are scoped separately when you need them.",
  },
  {
    question: "Can I see work similar to my product before we start?",
    answer:
      "I can share relevant case studies and, when an NDA allows, a few more specific examples. If the work is under NDA, we can start with a small paid workshop or audit so you can evaluate the fit on a real problem of yours.",
  },
];

function AskArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <title>Arrow</title>
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusMinusIcon({ open, reduceMotion }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <title>Toggle</title>
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
          scaleY: open ? 0 : 1,
        }}
        style={{ transformOrigin: "center" }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut }
        }
      />
    </svg>
  );
}

function FaqItem({ question, answer, initialOpen }) {
  const [open, setOpen] = useState(initialOpen ?? false);
  const contentId = useId();
  const reduceMotion = useReducedMotion() === true;

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.iconWrap}>
          <motion.span
            className={styles.iconInner}
            initial={false}
            animate={{ rotate: reduceMotion ? 0 : open ? 180 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut }
            }
          >
            <PlusMinusIcon open={open} reduceMotion={reduceMotion} />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            className={styles.panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0.2, ease: easeOut }
                : {
                    height: { duration: 0.35, ease: easeOut },
                    opacity: { duration: 0.25, ease: easeOut },
                  }
            }
            style={{ overflow: "hidden" }}
          >
            <div className={styles.panelInner}>
              <p className={styles.answer}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const reduceMotion = useReducedMotion() === true;

  const listContent = FAQS.map((item, index) => {
    const faqItem = (
      <FaqItem
        initialOpen={index === 0}
        question={item.question}
        answer={item.answer}
      />
    );

    return reduceMotion ? (
      <li key={item.question} className={styles.listItem}>
        {faqItem}
      </li>
    ) : (
      <motion.li
        key={item.question}
        className={styles.listItem}
        variants={faqItemVariants}
      >
        {faqItem}
      </motion.li>
    );
  });

  return (
    <section className={styles.root} aria-labelledby="faq-title">
      <ScrollReveal className={styles.titleContainer}>
        <Title title="FAQ" />
      </ScrollReveal>
      {reduceMotion ? (
        <ul className={styles.list}>{listContent}</ul>
      ) : (
        <motion.ul
          className={styles.list}
          variants={faqListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
        >
          {listContent}
        </motion.ul>
      )}
      <ScrollReveal delay={0.24}>
        <div className={styles.rootInner}>
          <p className={styles.followUpText}>Do you have any other questions?</p>
          <Link href="/#contact" className={styles.askLink}>
            <span>Ask me directly</span>
            <AskArrowIcon className={styles.askArrow} />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
