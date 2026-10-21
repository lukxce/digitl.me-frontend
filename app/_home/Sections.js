"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import b from "./base.module.css";
import { CONTACT, FAQ } from "./content";
import { Plus } from "./icons";
import Quiz from "./Quiz";
import x from "./sections.module.css";
import { Btn, EASE, Head, useApp } from "./ui";

/* ── Your plan: the three questions, right under the four steps ─────── */
export function PlanSection({ clients }) {
  return (
    <section className={`${b.glow} ${x.plan}`} data-section="Vaš plan">
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
    <section className={b.section} data-section="Pitanja">
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
                <AnimatePresence initial={false}>
                  {on
                    ? <motion.div
                        id={`faq-${i}`}
                        className={x.answer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
