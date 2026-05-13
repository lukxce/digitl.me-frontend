"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import Title from "./Title";
import styles from "./Faq.module.css";

const easeOut = [0.22, 1, 0.36, 1];

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
        animate={{ opacity: open ? 0 : 1 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.35, ease: easeOut }
        }
      />
    </svg>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
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
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0.2, ease: easeOut }
                : { duration: 0.4, ease: easeOut, opacity: { duration: 0.28 } }
            }
            style={{ overflow: "hidden" }}
          >
            <p className={styles.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section className={styles.root} aria-labelledby="faq-title">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className={styles.titleContainer}
      >
              <Title title="FAQ" />
      </motion.div>
      <ul className={styles.list}>
        {FAQS.map((item) => (
          <li key={item.question} className={styles.listItem}>
            <FaqItem question={item.question} answer={item.answer} />
          </li>
        ))}
      </ul>
    </section>
  );
}
