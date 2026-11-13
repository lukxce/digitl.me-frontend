"use client";

/* Bespoke pieces for "Wix, Squarespace or custom: the real three-year cost"
   (digitl.me). Every figure comes from the post:

   en3-race   the three-year cost race: Wix Core, Squarespace Basic and
              WordPress.com Business stack up year by year, with the add-ons
              (booking, inbox, your own hours) switched on and off
   en3-speed  HTTP Archive, October 2026: mobile origins with good Core Web
              Vitals per platform, against the 53.0% line for all origins
   en3-flow   when DIY stops paying: a short yes/no flow built from the
              post's "builder is enough" and "custom is worth it" lists */

import {
  animate,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "../../_home/icons";
import s from "./en3.module.css";

const EASE = [0.16, 1, 0.3, 1];

/* ── shared: a number that tweens to its new value ─────────────────────── */
const money = (v, cents) =>
  `$${v.toLocaleString("en-GB", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  })}`;

function Money({ value }) {
  const reduce = useReducedMotion();
  const cents = Math.round(value * 100) % 100 !== 0;
  const [shown, setShown] = useState(money(value, cents));
  const from = useRef(value);
  useEffect(() => {
    if (reduce) {
      setShown(money(value, cents));
      from.current = value;
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.7,
      ease: EASE,
      onUpdate: (v) => setShown(money(v, cents)),
    });
    from.current = value;
    return () => c.stop();
  }, [value, reduce, cents]);
  return <>{shown}</>;
}

/* ── en3-race ──────────────────────────────────────────────────────────── */
const BUILDERS = [
  { id: "wix", name: "Wix Core", plan: 348, domain: 21.35, booking: 0 },
  { id: "sq", name: "Squarespace Basic", plan: 144, domain: 20, booking: 192 },
  {
    id: "wp",
    name: "WordPress.com Business",
    plan: 300,
    domain: 13,
    booking: 0,
  },
];
const EMAIL = 84; // Google Workspace Business Starter, $7 x 12
const TIME = 1200; // Example: two hours a month at $50

const SEGS = [
  { key: "plan", label: "Plan" },
  { key: "domain", label: "Domain renewal" },
  { key: "booking", label: "Booking" },
  { key: "email", label: "Business inbox" },
  { key: "time", label: "Your time" },
];

const ADDONS = [
  { key: "booking", label: "Booking", hint: "Acuity on Squarespace" },
  { key: "email", label: "Business inbox", hint: "$7 a month" },
  { key: "time", label: "Your time", hint: "Example: 2 h a month at $50" },
];

function lines(b, year, on) {
  return {
    plan: b.plan * year,
    domain: b.domain * (year - 1),
    booking: on.booking ? b.booking * year : 0,
    email: on.email ? EMAIL * year : 0,
    time: on.time ? TIME * year : 0,
  };
}
const sum = (l) =>
  Math.round(Object.values(l).reduce((a, v) => a + v, 0) * 100) / 100;

function Race() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const [year, setYear] = useState(reduce ? 3 : 1);
  const [on, setOn] = useState({ booking: true, email: true, time: false });

  /* the race runs once by itself: year 1, 2, 3 */
  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      setYear(3);
      return;
    }
    const a = setTimeout(() => setYear(2), 1300);
    const b = setTimeout(() => setYear(3), 2600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [seen, reduce]);

  const rows = BUILDERS.map((b) => {
    const l = lines(b, year, on);
    return { ...b, l, total: sum(l), end: sum(lines(b, 3, on)) };
  });
  const scale = Math.max(...rows.map((r) => r.end));
  const sorted = [...rows].sort((a, b) => a.total - b.total);
  const low = sorted[0].id;

  return (
    <figure ref={ref} className={s.race}>
      <div className={s.raceHead}>
        <span className={s.cap}>Three-year cost, stacking up</span>
        <div className={s.years} role="tablist" aria-label="Year">
          {[1, 2, 3].map((y) => (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={year === y}
              onClick={() => setYear(y)}
            >
              Year {y}
              {year === y
                ? <motion.i
                    layoutId="en3-year"
                    className={s.yearKnob}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                : null}
            </button>
          ))}
        </div>
      </div>

      <LayoutGroup>
        <div className={s.lanes}>
          {sorted.map((r) => (
            <motion.div
              key={r.id}
              layout={!reduce}
              transition={{ duration: 0.6, ease: EASE }}
              className={s.lane}
            >
              <div className={s.laneTop}>
                <b className={s.laneName}>
                  {r.name}
                  {r.id === low
                    ? <motion.em
                        key={`${year}-${on.booking}-${on.email}-${on.time}`}
                        className={s.low}
                        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        Lowest
                      </motion.em>
                    : null}
                </b>
                <b className={s.laneTotal}>
                  <Money value={seen ? r.total : 0} />
                </b>
              </div>
              <div className={s.track} aria-hidden="true">
                {SEGS.map((g) => (
                  <motion.span
                    key={g.key}
                    data-seg={g.key}
                    initial={{ width: 0 }}
                    animate={{
                      width: seen ? `${(r.l[g.key] / scale) * 100}%` : 0,
                    }}
                    transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      <div className={s.legend} aria-hidden="true">
        {SEGS.filter(
          (g) => g.key === "plan" || g.key === "domain" || on[g.key],
        ).map((g) => (
          <span key={g.key}>
            <i data-seg={g.key} />
            {g.label}
          </span>
        ))}
      </div>

      <div className={s.addons}>
        <span className={s.cap}>Add to the bill</span>
        <div className={s.chips}>
          {ADDONS.map((a) => (
            <button
              key={a.key}
              type="button"
              aria-pressed={on[a.key]}
              data-seg={a.key}
              onClick={() => setOn((o) => ({ ...o, [a.key]: !o[a.key] }))}
            >
              <i aria-hidden="true" />
              <span>
                <b>{a.label}</b>
                <small>{a.hint}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <figcaption className={s.note}>
        Simplified. Annual billing, US dollars, prices read 12 November 2026.
        The free domain covers year one. Wix Core includes scheduling; the
        WordPress.com booking plugin varies in price and is not counted.
      </figcaption>
    </figure>
  );
}

/* ── en3-speed ─────────────────────────────────────────────────────────── */
const SPEED = [
  { name: "Wix", v: 80.9, say: "About four in five Wix mobile origins pass." },
  {
    name: "Shopify",
    v: 76.5,
    say: "Shopify mobile origins pass more often than the web as a whole.",
  },
  {
    name: "Squarespace",
    v: 71.0,
    say: "Squarespace mobile origins pass more often than the web as a whole.",
  },
  {
    name: "WordPress",
    v: 49.0,
    say: "WordPress mobile origins pass less often than the web as a whole.",
  },
];
const ALL = 53.0;

function Speed() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [pick, setPick] = useState(0);
  const p = SPEED[pick];
  const go = (dur, delay) => ({
    duration: reduce ? 0 : dur,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });

  return (
    <figure ref={ref} className={s.speed}>
      <span className={s.cap}>Mobile origins with good Core Web Vitals</span>

      <div className={s.readout} aria-live="polite">
        <motion.b
          key={p.name}
          className={s.readNum}
          data-under={p.v < ALL ? "" : undefined}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {p.v.toFixed(1)}%
        </motion.b>
        <span className={s.readText}>
          <b>{p.name}</b>
          <span>{p.say}</span>
        </span>
      </div>

      <div className={s.chart}>
        <div className={s.plot}>
          <motion.div
            className={s.base}
            style={{ bottom: `${ALL}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: seen ? 1 : 0 }}
            transition={go(0.9, 0.2)}
            aria-hidden="true"
          />
          {SPEED.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={s.col}
              aria-pressed={pick === i}
              aria-label={`${r.name}, ${r.v.toFixed(1)}%`}
              data-under={r.v < ALL ? "" : undefined}
              onClick={() => setPick(i)}
            >
              <motion.i
                initial={{ height: 0 }}
                animate={{ height: seen ? `${r.v}%` : 0 }}
                transition={go(1.1, 0.35 + i * 0.12)}
              >
                <motion.em
                  initial={{ opacity: 0 }}
                  animate={{ opacity: seen ? 1 : 0 }}
                  transition={go(0.4, 1 + i * 0.12)}
                >
                  {r.v.toFixed(1)}
                </motion.em>
              </motion.i>
            </button>
          ))}
        </div>
        <div className={s.names} aria-hidden="true">
          {SPEED.map((r, i) => (
            <span key={r.name} data-on={pick === i ? "" : undefined}>
              {r.name}
            </span>
          ))}
        </div>
        <div className={s.baseKey}>
          <i aria-hidden="true" />
          All origins {ALL.toFixed(1)}%, the web as a whole
        </div>
      </div>

      <div className={s.tests}>
        <span className={s.cap}>
          The good thresholds, 75th percentile of page loads
        </span>
        <div className={s.testRow}>
          {[
            ["LCP", "2.5 s", "biggest element shows"],
            ["INP", "200 ms", "reacts to a tap"],
            ["CLS", "0.1", "layout jump"],
          ].map(([k, v, t], i) => (
            <motion.div
              key={k}
              className={s.test}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={seen ? { opacity: 1, y: 0 } : {}}
              transition={go(0.5, 1.2 + i * 0.1)}
            >
              <em>{k}</em>
              <b>{v}</b>
              <span>{t}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <figcaption className={s.note}>
        October 2026. HTTP Archive Core Web Vitals Technology Report, Chrome UX
        Report field data. Tap a bar.
      </figcaption>
    </figure>
  );
}

/* ── en3-flow ──────────────────────────────────────────────────────────── */
const QS = {
  main: {
    q: "Is the site the main way new customers reach you?",
    yes: "areas",
    no: "referrals",
  },
  areas: {
    q: "Do you cover several services or areas and want a page for each?",
    yes: "pages",
    no: "ads",
  },
  ads: {
    q: "Do you run ads and need to know which page turns clicks into calls?",
    yes: "tracking",
    no: "outgrown",
  },
  outgrown: {
    q: "Have you outgrown the builder's booking or forms?",
    yes: "limits",
    no: "time",
  },
  time: {
    q: "Does someone on the team have the hours to keep the site up?",
    yes: "diy",
    no: "handover",
  },
};
const ENDS = {
  referrals: {
    custom: false,
    text: "Your work comes from referrals, and the site only has to confirm you exist. A builder page with a clear phone number and an up-to-date list of services does the job.",
  },
  diy: {
    custom: false,
    text: "One or two services, no ads to track and the hours for edits. A builder keeps the monthly bill small. Put your own hours in as a line.",
  },
  pages: {
    custom: true,
    text: "You need a page for every service and area you cover, so a search for exactly that lands on a page about exactly that.",
  },
  tracking: {
    custom: true,
    text: "You run ads, so you need each call and form traced back to the page that brought it in.",
  },
  limits: {
    custom: true,
    text: "The site is the main way new customers reach you, and the builder now limits what you can add.",
  },
  handover: {
    custom: true,
    text: "Nobody on the team has time to maintain the site, and a custom site hands that work to someone else.",
  },
};

function Flow() {
  const reduce = useReducedMotion();
  const [path, setPath] = useState([]); // [{ id, yes }]
  let at = "main";
  for (const step of path) at = step.yes ? QS[step.id].yes : QS[step.id].no;
  const end = ENDS[at];
  const q = QS[at];
  const answer = (yes) => setPath((p) => [...p, { id: at, yes }]);
  const fade = {
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE },
  };

  return (
    <motion.div
      className={s.flow}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={s.flowHead}>
        <span className={s.cap}>When DIY stops paying</span>
        <span className={s.flowTag}>Simplified</span>
      </div>

      <div className={s.trail}>
        {path.map((step) => (
          <motion.div key={step.id} className={s.done} {...fade}>
            <i aria-hidden="true" />
            <span>{QS[step.id].q}</span>
            <em data-yes={step.yes ? "" : undefined}>
              {step.yes ? "Yes" : "No"}
            </em>
          </motion.div>
        ))}

        {q
          ? <motion.div key={at} className={s.ask} {...fade}>
              <i aria-hidden="true" />
              <span className={s.askNo}>Question {path.length + 1}</span>
              <b className={s.askQ}>{q.q}</b>
              <div className={s.askBtns}>
                <button type="button" onClick={() => answer(true)}>
                  Yes
                </button>
                <button type="button" onClick={() => answer(false)}>
                  No
                </button>
              </div>
            </motion.div>
          : <motion.div
              key={at}
              className={s.end}
              data-custom={end.custom ? "" : undefined}
              aria-live="polite"
              {...fade}
            >
              <i aria-hidden="true" />
              <span className={s.endLabel}>
                {end.custom
                  ? "A custom site is likely worth it"
                  : "A builder is likely enough"}
              </span>
              <span className={s.endText}>{end.text}</span>
              <button
                type="button"
                className={s.again}
                onClick={() => setPath([])}
              >
                Start again <ArrowRight size={15} />
              </button>
            </motion.div>}
      </div>
    </motion.div>
  );
}

export const PIECES = {
  "en3-race": Race,
  "en3-speed": Speed,
  "en3-flow": Flow,
};
