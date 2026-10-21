"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import b from "./base.module.css";
import { ArrowUpRight, ChevronDown, ChevronUp } from "./icons";
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

/** The client's real site, shown whole. */
function Shot({ c }) {
  return (
    <span className={w.shot}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={w.shotImg} src={c.cover} alt={`${c.name} website`} />
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

function Project({ c, tone, closest, front }) {
  const ref = useRef(null);
  const run = useVisible(ref, 0.3) && front;
  const lesson = c.takeaways?.[0]?.title;
  const grown = c.metrics.find((m) => span(m));
  const rest = c.metrics.filter((m) => m !== grown);
  return (
    <a
      ref={ref}
      href={c.href}
      className={`${w.card} ${tone} ${closest ? w.isClosest : ""}`}
    >
      <Shot c={c} />
      <span className={`${w.body} ${w.story}`}>
        <CardTop c={c} closest={closest} />
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

/** Beside the deck: how many there are in all, and the way to them. */
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

// How many cards show behind the front one, and how far each peeks out.
const BEHIND = 2;
const pad = (n) => String(n).padStart(2, "0");

function usePeek() {
  const [peek, setPeek] = useState(22);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 760px)");
    const set = () => setPeek(mq.matches ? 22 : 14);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return peek;
}

/** One card of the deck. `k` is its place: 0 in front, 1 and 2 peeking out
    behind it, the rest waiting at the back; `was` is its place before the
    last move. The card that leaves the front drops away below; one that
    comes back to the front rises from there. */
function Slot({ k, was, n, peek, name, onShow, children }) {
  const shown = k <= BEHIND;
  const y = -k * peek;
  const scale = 1 - k * 0.045;
  const opacity = k === 0 ? 1 : shown ? 1 - k * 0.32 : 0;
  const blur = k === 0 ? 0 : Math.min(k, BEHIND + 1) * 1.6;

  let animate = { y, scale, opacity, filter: `blur(${blur}px)` };
  let times;
  if (was === 0 && k === n - 1 && n > 1) {
    animate = {
      y: [0, 70, y],
      scale: [1, 0.97, scale],
      opacity: [1, 0, 0],
      filter: ["blur(0px)", "blur(0px)", `blur(${blur}px)`],
    };
    times = [0, 0.5, 1];
  } else if (was === n - 1 && k === 0 && n > 1) {
    animate = {
      y: [70, 70, 0],
      scale: [0.97, 0.97, 1],
      opacity: [0, 0, 1],
      filter: ["blur(0px)", "blur(0px)", "blur(0px)"],
    };
    times = [0, 0.15, 1];
  }

  return (
    <motion.div
      className={w.slot}
      style={{ zIndex: n - k, transformOrigin: "50% 0%" }}
      initial={false}
      animate={animate}
      transition={{ duration: 0.7, ease: EASE, times }}
      aria-hidden={k !== 0}
      data-front={k === 0 ? "true" : undefined}
    >
      <div className={w.slotInner} inert={k !== 0}>
        {children}
      </div>
      {k !== 0 && shown
        ? <button
            type="button"
            tabIndex={-1}
            className={w.peekBtn}
            onClick={onShow}
            aria-label={`Show: ${name}`}
          />
        : null}
    </motion.div>
  );
}

export default function Work({ clients }) {
  const { plan } = useApp();
  const peek = usePeek();
  // The plan's closest match goes to the front of the deck.
  const match = clients.find((c) => c.slug === plan?.match);
  const ordered = match
    ? [match, ...clients.filter((c) => c !== match)]
    : clients;
  const slides = ordered.map((c) => ({
    key: c.slug,
    name: c.name,
    render: (front) => (
      <Project
        c={c}
        tone={TONES[clients.indexOf(c) % TONES.length]}
        closest={plan?.match === c.slug}
        front={front}
      />
    ),
  }));
  const n = slides.length;
  // where the deck is, and where it was before the last move
  const [pos, setPos] = useState({ active: 0, prev: 0 });
  const { active, prev } = pos;
  const order = slides.map((s) => s.key).join();
  // a new plan reorders the deck: start again from its front
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on reorder
  useEffect(() => setPos({ active: 0, prev: 0 }), [order]);
  const show = (i) => setPos((p) => ({ active: i, prev: p.active }));
  const go = (d) =>
    setPos((p) => ({ active: (p.active + d + n) % n, prev: p.active }));

  // a sideways swipe on a phone moves the deck; scrolling stays vertical
  const touch = useRef(null);
  const down = (e) => {
    if (e.pointerType !== "mouse") touch.current = [e.clientX, e.clientY];
  };
  const up = (e) => {
    const t = touch.current;
    touch.current = null;
    if (!t) return;
    const dx = e.clientX - t[0];
    const dy = e.clientY - t[1];
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3)
      go(dx < 0 ? 1 : -1);
  };

  return (
    <section className={`${b.section} ${w.section}`} data-section="Rezultati">
      <div className={b.container}>
        <div className={w.top}>
          <Head
            id="work"
            label="Projects"
            title="Work that speaks for itself."
            intro={
              match && clients.length > 1
                ? "From strategy to execution, here's what that looks like in practice. The first project is the one closest to yours."
                : "From strategy to execution, here's what that looks like in practice."
            }
          />
          {n > 1
            ? <div className={w.controls}>
                <span className={w.count} aria-live="polite">
                  {pad(active + 1)} <i>/ {pad(n)}</i>
                </span>
                <button
                  type="button"
                  className={w.arrow}
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  type="button"
                  className={w.arrow}
                  onClick={() => go(1)}
                  aria-label="Next project"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            : null}
        </div>

        {/* the projects change on the left; all of them are a click away
            on the right */}
        <div className={w.stage}>
          <div
            className={w.deck}
            onPointerDown={down}
            onPointerUp={up}
            onPointerCancel={() => {
              touch.current = null;
            }}
          >
            {slides.map((s, i) => (
              <Slot
                key={s.key}
                k={(i - active + n) % n}
                was={(i - prev + n) % n}
                n={n}
                peek={peek}
                name={s.name}
                onShow={() => show(i)}
              >
                {s.render(i === active)}
              </Slot>
            ))}
          </div>
          <div className={w.side}>
            <AllCases clients={clients} />
          </div>
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
