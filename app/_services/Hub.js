"use client";

import { motion } from "motion/react";
import Link from "next/link";
import b from "../_home/base.module.css";
import { SERVICE_PAGES, SERVICES, STEPS } from "../_home/content";
import { ArrowRight } from "../_home/icons";
import { Btn, Reveal, useApp } from "../_home/ui";
import { STICKERS } from "./Stickers";
import u from "./usluge.module.css";

/* /services: the five services in one place, each card leading to its page,
   then how we work and where to start. Card titles, card lines, the rows
   and the steps are the homepage's approved wording. */

export const HUB = {
  title: "Digital marketing services",
  lead: "We run paid advertising on Google and Meta, SEO, web design, social media and branding, and we take repetitive tasks off your team with business automation. You can take a single service, but you get the most when we run all of your marketing as one system.",
  body: [
    "Digitl is a full-service marketing agency that runs ads, SEO, websites, social media and brand for businesses. When we run the services together, ads lead to pages built for them, and the website, social channels and ads look like one brand.",
    "For each channel we measure something concrete: cost per enquiry for ads, rankings, visits and enquiries from search for SEO, speed and conversion rate for the website. You see those numbers in a monthly report.",
  ],
};

/* the hero's right side: the five service stickers, scattered, each
   springing in once and tilting when you point at it; each leads to its
   page */
const SCATTER = [
  { id: "ads", x: "6%", y: "8%", r: -10, s: 1 },
  { id: "seo", x: "52%", y: "0%", r: 8, s: 0.92 },
  { id: "web", x: "36%", y: "44%", r: -4, s: 1.08 },
  { id: "social", x: "70%", y: "46%", r: 12, s: 0.9 },
  { id: "brand", x: "4%", y: "62%", r: 6, s: 0.88 },
];

function Scatter() {
  return (
    <div className={u.scatter}>
      {SCATTER.map((it, i) => {
        const Sticker = STICKERS[it.id];
        const service = SERVICES.find((s) => s.id === it.id);
        return (
          <motion.a
            key={it.id}
            href={service?.page}
            className={u.scatterItem}
            style={{ left: it.x, top: it.y, "--s": it.s }}
            initial={{ scale: 0, rotate: it.r - 30 }}
            animate={{ scale: 1, rotate: it.r }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 14,
              delay: 0.25 + i * 0.09,
            }}
            whileHover={{ rotate: it.r - 12, scale: 1.06 }}
          >
            <Sticker size="100%" />
            <em>{service?.footer}</em>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function Hub() {
  const { openBooking } = useApp();
  return (
    <>
      <section className={u.hero}>
        <div className={`${b.container} ${u.heroGrid}`}>
          <div className={u.heroCopy}>
            <nav className={u.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <span className={b.label}>Our services</span>
            <h1 className={`${b.display} ${u.title}`}>{HUB.title}</h1>
            <p className={u.lead}>{HUB.lead}</p>
            <div className={u.ctas}>
              <Btn variant="accent" onClick={() => openBooking()}>
                Book a call
              </Btn>
              <Btn variant="ghost" arrow={false} href="/projects">
                Our work
              </Btn>
            </div>
          </div>
          <Scatter />
        </div>
      </section>

      <section className={b.section}>
        <div className={b.container}>
          <ul className={u.hubList}>
            {SERVICE_PAGES.map((s, i) => {
              const Sticker = STICKERS[s.id];
              return (
                <Reveal as="li" key={s.id} i={i}>
                  <Link href={s.page} className={u.hubItem} data-tone={s.id}>
                    <span className={u.hubSticker} aria-hidden="true">
                      <Sticker size="100%" />
                    </span>
                    <span className={u.hubMain}>
                      <h2>{s.title}</h2>
                      <p>{s.body}</p>
                      <span className={u.hubGo}>
                        More about the service <ArrowRight size={14} />
                      </span>
                    </span>
                    <ul className={u.hubRows}>
                      {s.includes.map((row) => (
                        <li key={row}>{row}</li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={`${b.section} ${b.glow}`}>
        <div className={`${b.container} ${u.split}`}>
          <div className={u.splitHead}>
            <span className={b.label}>One system</span>
            <h2 className={u.splitTitle}>
              The full marketing function, handled as one system, not a menu of
              disconnected services.
            </h2>
          </div>
          <div className={u.prose}>
            {HUB.body.map((p, i) => (
              <Reveal as="p" key={p.slice(0, 24)} i={i}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${b.section} ${u.steps}`}>
        <div className={b.container}>
          <div className={b.head}>
            <span className={b.label}>How we work</span>
            <h2 className={b.h2}>What working with us looks like</h2>
            <p className={b.intro}>
              One process from the first call to the monthly report. At every
              step you know what we are doing and what comes next.
            </p>
          </div>
        </div>
        <ol className={u.stepRow} data-n={STEPS.length}>
          {STEPS.map(([title, text], i) => (
            <Reveal as="li" key={title} i={i} className={u.step}>
              <span className={u.stepNum}>
                {String(i + 1).padStart(2, "0")}/
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className={u.ctaBand}>
        <div className={b.container}>
          <Reveal className={u.ctaCard}>
            <h2>Where should you start?</h2>
            <p>
              Answer three short questions and you'll get a recommendation: what
              your marketing needs most right now, and where it makes most sense
              to start.
            </p>
            <div className={u.ctas}>
              <Btn variant="white" href="/#your-plan">
                Three questions, half a minute
              </Btn>
              <Btn variant="glass" arrow={false} onClick={() => openBooking()}>
                Book a call
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
