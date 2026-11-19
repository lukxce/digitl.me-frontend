"use client";

import { motion } from "motion/react";
import elektromil from "../assets/clients/elektromil.webp";
import fourElements from "../assets/clients/four-elements.webp";
import idealKeramika from "../assets/clients/ideal-keramika.webp";
import molerNis from "../assets/clients/moler-nis.webp";
import planetResidence from "../assets/clients/planet-residence.webp";
import praxisCentar from "../assets/clients/praxis-centar.webp";
import primaDental from "../assets/clients/prima-dental.webp";
import thermiq from "../assets/clients/thermiq.webp";
import vojvodaResidence from "../assets/clients/vojvoda-residence.webp";
import b from "./base.module.css";
import HeroShowcase from "./HeroShowcase";
import h from "./hero.module.css";
import { Btn, EASE, useApp } from "./ui";

/* A headline line. It is readable from the first paint and only settles
   into place (it used to rise from under a mask, which held back the
   page's main paint by seconds on slow phones). The trailing space keeps
   the words apart in the page text: "marketing meets", not "marketingmeets". */
function Line({ delay, children }) {
  return (
    <span className={h.line} style={{ animationDelay: `${delay}ms` }}>
      {children}{" "}
    </span>
  );
}

/* The same strip as digitl.rs (Luka, 19 Nov 2026). `h` evens out logos that
   read larger than the rest at the same height; a mark gets its name. */
const LOGOS = [
  { src: elektromil.src, name: "ElektroMil", h: 0.7 },
  { src: thermiq.src, name: "ThermiQ" },
  { src: vojvodaResidence.src, name: "Vojvoda Residence" },
  { src: idealKeramika.src, name: "Ideal Keramika" },
  { src: planetResidence.src, name: "Planet Residence" },
  { src: fourElements.src, name: "Four Elements", label: true },
  { src: praxisCentar.src, name: "Praxis centar", h: 0.75 },
  { src: primaDental.src, name: "Prima Dental" },
  { src: molerNis.src, name: "Moler Niš", label: true },
];

function Logos() {
  const items = LOGOS;
  // The strip runs on a loop: four identical copies, moved left by one copy
  // per cycle, so there is never a gap even on wide screens. Only the first
  // copy is read by screen readers.
  const row = (copy) =>
    items.map((l) => (
      <li key={`${copy}-${l.name}`} aria-hidden={copy > 0 || undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={l.src}
          alt={copy > 0 ? "" : l.name}
          style={l.h ? { "--h": l.h } : undefined}
        />
        {l.label ? <span>{l.name}</span> : null}
      </li>
    ));
  return (
    <motion.div
      className={h.logos}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className={h.logosLabel}>Trusted by</span>
      <div className={h.rail}>
        <ul className={h.track}>{[0, 1, 2, 3].map((copy) => row(copy))}</ul>
      </div>
    </motion.div>
  );
}

export default function Hero({ clients, visual = null }) {
  const { scrollTo, openBooking } = useApp();

  return (
    <section id="top" className={h.hero} data-section="Start">
      <div className={`${b.container} ${h.top}`}>
        <div className={h.copy}>
          <p
            className={`${h.status} ${b.fadeUp}`}
            style={{ animationDelay: "40ms" }}
          >
            <span className={h.kind}>Full-service marketing agency</span>
            <span className={h.slots}>
              <span className={b.liveDot} />2 slots open
            </span>
          </p>
          <h1 className={`${b.display} ${h.title}`}>
            <Line delay={100}>Where marketing</Line>
            <Line delay={170}>
              meets <span className={h.accent}>real</span>
            </Line>
            <Line delay={240}>
              <span className={h.accent}>business results.</span>
            </Line>
          </h1>
          <div className={b.fadeUp} style={{ animationDelay: "520ms" }}>
            <p className={h.lead}>
              {/* the last two words stay together, so "roof." never sits
                  alone on a line */}
              {
                "We build brands that stand out, websites that sell and campaigns that bring customers. From search and ads to social media, everything your business needs, under one\u00a0roof."
              }
            </p>
            <div className={h.ctas}>
              <Btn variant="accent" onClick={() => openBooking()}>
                Get started
              </Btn>
              <Btn
                variant="ghost"
                arrow={false}
                onClick={() => scrollTo("#work")}
              >
                Our work
              </Btn>
            </div>
          </div>
        </div>

        {/* one of our services, shown working: a different one on each visit */}
        <div className={h.search}>{visual ?? <HeroShowcase />}</div>
      </div>

      <div className={b.container}>
        <Logos />
      </div>
    </section>
  );
}
