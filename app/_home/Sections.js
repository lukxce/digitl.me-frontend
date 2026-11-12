"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Audit from "./Audit";
import b from "./base.module.css";
import { CONTACT, FAQ } from "./content";
import { Plus } from "./icons";
import Quiz from "./Quiz";
import x from "./sections.module.css";
import { Btn, EASE, Head, useApp } from "./ui";

/* ── Your plan: the three questions, right under the four steps ─────── */
/* ── Site check: Google's own phone test, live, right before the form;
   the address and the scores travel into the form below ──────────────── */
export function Check() {
  return (
    <section className={`${b.glow} ${x.check}`} data-section="Site check">
      <div className={b.container}>
        <span id="site-check" className={b.anchor} />
        <div className={x.checkHead}>
          <span className={b.label}>Free check</span>
          <h2>Start with your own site.</h2>
          <p>
            The same test Google uses to score sites on a phone. Your score
            and the first fixes in about twenty seconds, no sign-up.
          </p>
        </div>
        <Audit />
      </div>
    </section>
  );
}

export function PlanSection({ clients }) {
  return (
    <section className={`${b.glow} ${x.plan}`} data-section="Your plan">
      <div className={b.container}>
        <span id="your-plan" className={b.anchor} />
        <div className={x.planGrid}>
          <div className={x.planHead}>
            <span className={b.label}>Three questions</span>
            <h2>Where should you start?</h2>
            <p>
              Answer three short questions and you'll get a recommendation: what
              your marketing needs most right now, and where it makes most sense
              to start.
            </p>
            <small>Takes about half a minute.</small>
          </div>
          <Quiz clients={clients} />
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */
export function Faq() {
  const [open, setOpen] = useState(0);
  const { openBooking } = useApp();
  return (
    <section className={b.section} data-section="FAQ">
      <div className={`${b.container} ${x.faq}`}>
        <div className={x.faqSide}>
          <Head
            id="faq"
            label="FAQ"
            title="Have more questions?"
            intro={`We're happy to help. If yours isn't here, write to ${CONTACT.email}.`}
          />
          <Btn variant="accent" size="sm" onClick={() => openBooking()}>
            Book a call
          </Btn>
        </div>
        <ul className={x.faqList}>
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(on ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <i className={on ? x.plusOn : ""}>
                    <Plus size={16} strokeWidth={2.4} />
                  </i>
                </button>
                {/* Every answer is in the page (search engines and AI
                    answers read them); a closed one is only folded. */}
                <motion.div
                  id={`faq-${i}`}
                  className={x.answer}
                  initial={false}
                  animate={
                    on
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.4, ease: EASE }}
                  aria-hidden={!on}
                >
                  <p>{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
