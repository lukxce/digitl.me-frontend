"use client";

import { motion } from "motion/react";
import b from "./base.module.css";
import { EASE, Head, Reveal } from "./ui";
import v from "./voices.module.css";

/* Client quotes, written with the clients' permission (Nov 2026); the
   Serbian originals are on digitl.rs. */
const QUOTES = [
  {
    text: "We had the stock, the know-how and the installers, but online we barely existed. Digitl built a site with our whole catalogue, a new look for the company and a tool that compares our prices with the competition every Monday. Today most of our visits come from Google search, without any ads.",
    name: "Uroš Zdravković",
    role: "Owner, Thermiq",
    tone: ["#2a29ff", "#9ef34a"],
  },
  {
    text: "For years all our work came through referrals. In under two months the site was first on Google, and the people who call us have already seen the price list, so we go straight to booking a date.",
    name: "Vojin Radulović",
    role: "Moler Niš",
    tone: ["#ff8078", "#ffc9a8"],
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
      data-section="Clients"
    >
      <div className={b.container}>
        <Head
          id="clients"
          label="Clients"
          title="Trusted by our clients."
          intro="Recommendations from clients who take marketing seriously."
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
            </div>
          </Reveal>
          {rest.map((q, i) => (
            <Reveal key={q.text} as="figure" i={i + 1} className={v.small}>
              <QuoteMark className={v.markSm} />
              <blockquote className={v.smallText}>{q.text}</blockquote>
              <div className={v.smallFoot}>
                <Person q={q} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
