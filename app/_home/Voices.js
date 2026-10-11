"use client";

import { motion } from "motion/react";
import b from "./base.module.css";
import { EASE, Head, Reveal } from "./ui";
import v from "./voices.module.css";

/* Slots for real client quotes. Until they arrive, each is marked as waiting
   so nothing here can pass for a real testimonial. */
const QUOTES = [
  {
    text: "The strongest client quote goes here: what changed in their business after working with us, in two or three sentences, in their words.",
    name: "Name Surname",
    role: "Owner, company name",
    tone: ["#2a29ff", "#9ef34a"],
  },
  {
    text: "A shorter quote: what mattered most to them in working with us.",
    name: "Name Surname",
    role: "Role, company name",
    tone: ["#ff8078", "#ffc9a8"],
  },
  {
    text: "A shorter quote: one concrete result they noticed.",
    name: "Name Surname",
    role: "Role, company name",
    tone: ["#0b0b16", "#5d5cff"],
  },
];

function QuoteMark({ className }) {
  return (
    <svg
      viewBox="0 0 32 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 24V14C0 6.3 4.1 1.6 12.3 0l1.3 3.6C9.4 5 7.3 7.5 7 11h6v13H0Zm18 0V14C18 6.3 22.1 1.6 30.3 0l1.3 3.6C27.4 5 25.3 7.5 25 11h6v13H18Z" />
    </svg>
  );
}

function Person({ q, dark = false }) {
  return (
    <figcaption className={`${v.person} ${dark ? v.personDark : ""}`}>
      <span
        className={v.avatar}
        style={{
          background: `linear-gradient(135deg, ${q.tone[0]}, ${q.tone[1]})`,
        }}
      >
        {q.name
          .split(" ")
          .map((x) => x[0])
          .join("")
          .slice(0, 2)}
      </span>
      <span>
        <b>{q.name}</b>
        <em>{q.role}</em>
      </span>
    </figcaption>
  );
}

export default function Voices() {
  const [main, ...rest] = QUOTES;
  return (
    <section
      className={`${b.section} ${b.glow} ${v.section}`}
      data-section="Utisci"
    >
      <div className={b.container}>
        <Head
          id="clients"
          label="Clients"
          title="Trusted by our clients."
          intro="What it's like to work with us."
        />
        <div className={v.grid}>
          <Reveal as="figure" className={v.main}>
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className={v.markWrap}
            >
              <QuoteMark className={v.mark} />
            </motion.span>
            <blockquote className={v.mainText}>{main.text}</blockquote>
            <div className={v.mainFoot}>
              <Person q={main} dark />
              <span className={v.pending}>Waiting for a real quote</span>
            </div>
          </Reveal>
          {rest.map((q, i) => (
            <Reveal key={q.text} as="figure" i={i + 1} className={v.small}>
              <QuoteMark className={v.markSm} />
              <blockquote className={v.smallText}>{q.text}</blockquote>
              <div className={v.smallFoot}>
                <Person q={q} />
                <span className={v.pending}>Waiting for a real quote</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
