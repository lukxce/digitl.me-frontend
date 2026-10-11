"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import b from "./base.module.css";
import { ArrowUpRight } from "./icons";
import { Bridge, Counter, EASE, Head, Roll, useApp, useVisible } from "./ui";
import w from "./work.module.css";

function CardTop({ c, dark = false, closest = false }) {
  return (
    <span className={`${w.cardTop} ${dark ? w.cardTopDark : ""}`}>
      {c.logo
        ? <span className={w.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt="" />
          </span>
        : null}
      <span className={w.cat}>{c.category}</span>
      {closest ? <span className={w.closest}>Closest to you</span> : null}
      <span className={w.go}>
        <ArrowUpRight size={17} />
      </span>
    </span>
  );
}

/** The client's real site, shown as it is. */
function Shot({ c }) {
  return (
    <span className={w.shot}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.cover} alt={`${c.name} website`} loading="lazy" />
    </span>
  );
}

function Stats({ metrics, run, dark = false }) {
  return (
    <span
      className={`${w.stats} ${dark ? w.statsDark : ""}`}
      data-n={metrics.length}
    >
      {metrics.map((m) => (
        <span key={m.label}>
          <b>
            <Counter metric={m} run={run} ms={1600} />
          </b>
          <em>{m.label}</em>
        </span>
      ))}
    </span>
  );
}

/* ── a project from the CMS ───────────────────────────────────────────────
   Everything on the card is the project's own data: name, category, cover,
   the first lesson and the metrics. A metric written as a before and an
   after ("1 → 44") is drawn as tiles; the others stay plain numbers. */

/** "1 → 44" → [1, 44]; anything else → null. */
function span(metric) {
  const m = String(metric.value).match(/^(\d+)\s*(?:→|->)\s*(\d+)$/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

// Past this many the sheet is drawn to scale and the number carries the rest.
const MAX_TILES = 48;

/** What was there in ink, what was added in blue (or, for a number that went
    down, what is left in blue and what went as an outline). */
function Growth({ metric, run }) {
  const [from, to] = span(metric);
  const big = Math.max(from, to);
  const small = Math.min(from, to);
  const scale = big > MAX_TILES ? MAX_TILES / big : 1;
  const total = Math.round(big * scale);
  const kept = small > 0 ? Math.max(1, Math.round(small * scale)) : 0;
  const tiles = Array.from({ length: total }, (_, i) => ({
    id: `tile-${i}`,
    kind: i < kept ? "kept" : to >= from ? "new" : "gone",
    delay: i < kept ? 0 : 0.25 + (i - kept) * 0.03,
  }));
  // even rows of up to twelve, so the last one is not left ragged
  const rows = Math.max(1, Math.ceil(total / 12));
  const cols = Math.max(8, Math.ceil(total / rows));
  return (
    <span className={w.growth}>
      <span className={w.growthNum}>
        <b>{metric.value}</b>
        <em>{metric.label}</em>
      </span>
      {total > 0
        ? <span
            className={w.tiles}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            aria-hidden="true"
          >
            {tiles.map((t) => (
              <motion.i
                key={t.id}
                data-kind={t.kind}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={run ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: t.delay, duration: 0.4, ease: EASE }}
              />
            ))}
          </span>
        : null}
    </span>
  );
}

const TONES = [w.tBlue, w.tMist, w.tLime];

function Project({ c, tone, closest, solo }) {
  const ref = useRef(null);
  const run = useVisible(ref, 0.3);
  const lesson = c.takeaways?.[0]?.title;
  const grown = c.metrics.find((m) => span(m));
  const rest = c.metrics.filter((m) => m !== grown);
  return (
    <a
      ref={ref}
      href={c.href}
      className={`${w.card} ${tone} ${solo ? w.solo : ""} ${closest ? w.isClosest : ""}`}
    >
      <CardTop c={c} closest={closest} />
      <Shot c={c} />
      <span className={w.story}>
        <span className={w.name}>{c.name}</span>
        {lesson
          ? <span className={w.learned}>
              <em>Learned on the work</em>
              <span className={w.lesson}>{lesson}</span>
            </span>
          : null}
        {grown ? <Growth metric={grown} run={run} /> : null}
        {rest.length ? <Stats metrics={rest} run={run} /> : null}
      </span>
    </a>
  );
}

function AllCases({ clients }) {
  const ref = useRef(null);
  const run = useVisible(ref, 0.4);
  return (
    <a ref={ref} href="/projects" className={`${w.card} ${w.ink}`}>
      <span className={w.allNum}>
        <Roll value={run ? 50 : 0} ms={1600} suffix="+" />
      </span>
      <span className={w.allText}>companies we've helped grow.</span>
      {/* with a single project its site is already the card beside this */}
      {clients.length > 1
        ? <span className={w.allSites}>
            {clients.slice(0, 4).map((c) => (
              <span key={c.slug} className={w.allSite}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.cover} alt="" loading="lazy" />
                <b>{c.name}</b>
              </span>
            ))}
          </span>
        : null}
      <span className={w.allBtn}>
        View all projects <ArrowUpRight size={16} />
      </span>
    </a>
  );
}

export default function Work({ clients }) {
  const { plan } = useApp();
  // Up to two projects on the page. The plan's closest match takes the
  // first slot; a single project gets the whole row to itself.
  const match = clients.find((c) => c.slug === plan?.match);
  const picks = (
    match ? [match, ...clients.filter((c) => c !== match)] : clients
  ).slice(0, 2);
  const solo = picks.length === 1;

  return (
    <section className={`${b.section} ${w.section}`} data-section="Rezultati">
      <div className={b.container}>
        <Head
          id="work"
          label="Projects"
          title="Work that speaks for itself."
          intro={
            match && !solo
              ? "From strategy to execution, here's what that looks like in practice. The first project is the one closest to yours."
              : "From strategy to execution, here's what that looks like in practice."
          }
        />
        <div className={`${w.grid} ${solo ? w.gridSolo : ""}`}>
          {picks.map((c) => (
            <Project
              key={c.slug}
              c={c}
              tone={TONES[clients.indexOf(c) % TONES.length]}
              closest={plan?.match === c.slug}
              solo={solo}
            />
          ))}
          <AllCases clients={clients} />
        </div>
      </div>
      <div className={b.container}>
        <Bridge
          text="Numbers are one thing. Here's what the people we work with say."
          to="#clients"
          label="What clients say"
        />
      </div>
    </section>
  );
}
