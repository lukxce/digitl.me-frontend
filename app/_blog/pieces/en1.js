"use client";

/* Bespoke pieces for "How much should a small business spend on Google Ads?"
   (digitl.me). Every figure and rule below is in the post:

   en1-backwards  the budget worked backwards from the reader's own numbers:
                  gross profit x close rate = break-even cost per lead, minus
                  what you keep back = allowable cost per lead, x enquiries =
                  monthly budget, / 30.4 = average daily budget; then tested
                  against LocaliQ's average cost per lead for the trade.
   en1-month      Google's budget rules as a month that fills day by day: one
                  day may cost up to 2x the average daily budget, the month
                  stays within 30.4x.
   en1-lsa        what you are charged for: every click on Search ads, only a
                  valid lead on Local Services Ads. */

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Rotate } from "../../_home/icons";
import s from "./en1.module.css";

const EASE = [0.16, 1, 0.3, 1];
const MONTH = 30.4;

const money = (n, dec = 0) =>
  `$${n.toLocaleString("en-GB", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })}`;

/* enter once on view; with reduced motion the end state comes at once.
   The initial state is the same either way, so the server render and the
   first client render agree. */
const NOW = { duration: 0 };
function useRise(delay = 0) {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: reduce ? NOW : { duration: 0.7, ease: EASE, delay },
  };
}

/* a number that glides to its new value */
function Tween({ value, format }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduce) {
      from.current = value;
      setV(value);
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.6,
      ease: EASE,
      onUpdate: (x) => {
        from.current = x;
        setV(x);
      },
    });
    return () => c.stop();
  }, [value, reduce]);
  return <>{format(v)}</>;
}

function Slider({ label, value, shown, min, max, step, onChange, hint }) {
  const p = ((Math.min(max, Math.max(min, value)) - min) / (max - min)) * 100;
  return (
    <label className={s.field}>
      <span className={s.fieldTop}>
        <span className={s.fieldLabel}>{label}</span>
        <b className={s.fieldValue}>{shown}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={s.slider}
        style={{ "--p": `${p}%` }}
      />
      {hint ? <span className={s.fieldHint}>{hint}</span> : null}
    </label>
  );
}

/* ── 1. work it backwards ─────────────────────────────────────────────── */

/* LocaliQ's average cost per lead for search ads, US data, as the post
   quotes them (the home services trades are from the 2025 report) */
const TRADES = [
  { id: "cleaning", name: "Cleaning and maid services", cpl: 46.99, y: 2025 },
  { id: "electric", name: "Electricians", cpl: 93.69, y: 2025 },
  { id: "plumbing", name: "Plumbing", cpl: 129.02, y: 2025 },
  { id: "ac", name: "Air conditioning", cpl: 127.74, y: 2025 },
  { id: "roofing", name: "Roofing and gutters", cpl: 228.15, y: 2025 },
  { id: "home", name: "Home and home improvement", cpl: 90.92, y: 2026 },
  { id: "dentists", name: "Dentists and dental services", cpl: 72.97, y: 2026 },
  { id: "physicians", name: "Physicians and surgeons", cpl: 40.04, y: 2026 },
  { id: "all", name: "All industries", cpl: 66.69, y: 2026 },
];

const PRESETS = [
  {
    id: "cleaning",
    name: "Regular cleaning",
    value: 1200,
    close: 25,
    keep: 50,
    trade: "cleaning",
  },
  {
    id: "boiler",
    name: "Boiler repair",
    value: 400,
    close: 100 / 3,
    keep: 50,
    trade: "plumbing",
  },
];

function Backwards() {
  const [value, setValue] = useState(1200);
  const [close, setClose] = useState(25);
  const [keep, setKeep] = useState(50);
  const [leads, setLeads] = useState(10);
  const [trade, setTrade] = useState("cleaning");
  const [preset, setPreset] = useState("cleaning");

  const breakEven = value * (close / 100);
  const allowable = breakEven * (1 - keep / 100);
  const monthly = allowable * leads;
  const daily = monthly / MONTH;
  const t = TRADES.find((x) => x.id === trade) ?? TRADES[0];
  const above = allowable >= t.cpl;
  const top = Math.max(allowable, t.cpl) * 1.25 || 1;
  const oneIn = Math.round(100 / close);

  const edit = (set) => (n) => {
    set(n);
    setPreset("");
  };
  const pickPreset = (p) => {
    setValue(p.value);
    setClose(p.close);
    setKeep(p.keep);
    setTrade(p.trade);
    setPreset(p.id);
  };

  const rise0 = useRise();
  const rise1 = useRise(0.1);
  const rise2 = useRise(0.2);

  return (
    <motion.figure className={s.back} {...rise0}>
      <div className={s.head}>
        <span className={s.cap}>Work it backwards</span>
        <span className={s.tag}>Your numbers</span>
      </div>

      <div className={s.presets}>
        <span className={s.presetsLabel}>Start from the post's example</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={s.chip}
            aria-pressed={preset === p.id}
            onClick={() => pickPreset(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className={s.fields}>
        <Slider
          label="Gross profit from one customer"
          value={value}
          shown={money(value)}
          min={100}
          max={5000}
          step={50}
          onChange={edit(setValue)}
          hint="First job for one-off work, a year for repeat work"
        />
        <Slider
          label="Close rate"
          value={close}
          shown={`${Math.round(close)}%`}
          min={5}
          max={80}
          step={1}
          onChange={edit(setClose)}
          hint={`About 1 in ${oneIn} enquiries turns into paid work`}
        />
        <Slider
          label="Kept back as profit"
          value={keep}
          shown={`${keep}%`}
          min={0}
          max={90}
          step={5}
          onChange={edit(setKeep)}
          hint="We'd start at half the break-even figure"
        />
        <Slider
          label="Enquiries you want each month"
          value={leads}
          shown={leads}
          min={1}
          max={40}
          step={1}
          onChange={edit(setLeads)}
        />
      </div>

      <motion.div className={s.chain} {...rise1}>
        <div className={s.link}>
          <span className={s.linkName}>Break-even cost per lead</span>
          <span className={s.linkSum}>
            {money(value)} x {Math.round(close)}%
          </span>
          <b className={s.linkNum}>
            <Tween value={breakEven} format={(v) => money(v)} />
          </b>
        </div>
        <div className={s.link} data-on="">
          <span className={s.linkName}>Allowable cost per lead</span>
          <span className={s.linkSum}>
            {money(breakEven)}, minus {keep}% kept back
          </span>
          <b className={s.linkNum}>
            <Tween value={allowable} format={(v) => money(v)} />
          </b>
        </div>
      </motion.div>

      <motion.div className={s.total} {...rise2}>
        <div>
          <span className={s.totalCap}>Monthly budget</span>
          <b className={s.totalNum}>
            <Tween value={monthly} format={(v) => money(v)} />
          </b>
          <span className={s.totalSum}>
            {money(allowable)} x {leads} enquiries
          </span>
        </div>
        <div className={s.totalDay}>
          <span className={s.totalCap}>Average daily budget</span>
          <b>
            <Tween value={daily} format={(v) => money(v)} />
          </b>
          <span className={s.totalSum}>monthly / 30.4</span>
        </div>
      </motion.div>

      <div className={s.bench}>
        <div className={s.benchTop}>
          <span className={s.benchLabel}>Test it against your trade</span>
          <select
            className={s.select}
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            aria-label="Trade"
          >
            {TRADES.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} ({x.y})
              </option>
            ))}
          </select>
        </div>
        <div className={s.scale}>
          <div className={s.scaleTrack}>
            <motion.i
              className={s.scaleFill}
              data-above={above ? "" : undefined}
              animate={{ width: `${(allowable / top) * 100}%` }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <motion.span
              className={s.avgMark}
              data-edge={t.cpl / top > 0.6 ? "" : undefined}
              animate={{ left: `${(t.cpl / top) * 100}%` }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className={s.avgText}>
                Trade average <b>{money(t.cpl, 2)}</b>
              </span>
            </motion.span>
          </div>
          <span className={s.youText}>
            Your allowable cost per lead <b>{money(allowable)}</b>
          </span>
        </div>
        <div className={s.verdict} data-above={above ? "" : undefined}>
          {above
            ? "Above the average lead in this trade, so Search has room to work."
            : "Below the average: Search will probably lose money until your site converts better or each customer is worth more to you."}
        </div>
        <span className={s.note}>
          Average cost per lead for search ads, LocaliQ benchmarks, US data.
          Pure arithmetic on your inputs.
        </span>
      </div>
    </motion.figure>
  );
}

/* ── 2. the month that fills ──────────────────────────────────────────── */

/* how busy each day of an example month is, as a multiple of the average
   daily budget: weekdays busier, weekends quieter, two spikes near the 2x
   ceiling. Scaled so the month lands just under the 30.4x limit. */
const WEEK = [1.15, 1.22, 1.1, 1.26, 0.98, 0.58, 0.48];
const SPIKES = { 8: 1.97, 17: 1.92, 24: 1.6 };
const DAYS = (() => {
  const raw = Array.from({ length: 30 }, (_, i) => SPIKES[i] ?? WEEK[i % 7]);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => Math.min(2, (v / sum) * 30.1));
})();

const BUDGETS = [
  { id: "ten", name: "$10 a day", daily: 10, note: "Google's own example" },
  {
    id: "clean",
    name: "$1,500 a month",
    daily: 1500 / MONTH,
    note: "The cleaning example",
  },
  { id: "plumb", name: "$15 a day", daily: 15, note: "The plumbing example" },
];

function Month() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [b, setB] = useState("clean");
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const [pick, setPick] = useState(null);
  const budget = BUDGETS.find((x) => x.id === b) ?? BUDGETS[1];
  const daily = budget.daily;
  const limit = daily * MONTH;

  // biome-ignore lint/correctness/useExhaustiveDependencies: run replays it
  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      setShown(DAYS.length);
      return;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= DAYS.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [seen, reduce, run]);

  const spent = useMemo(
    () => DAYS.slice(0, shown).reduce((a, m) => a + m * daily, 0),
    [shown, daily],
  );
  const ceiling = 2 * Math.round(daily);
  const day = pick === null ? null : DAYS[pick];
  const rise = useRise();

  return (
    <motion.figure ref={ref} className={s.month} {...rise}>
      <div className={s.head}>
        <span className={s.cap}>One month of spend</span>
        <span className={s.tag}>Example, simplified</span>
      </div>

      <div className={s.presets}>
        {BUDGETS.map((x) => (
          <button
            key={x.id}
            type="button"
            className={s.chip}
            aria-pressed={b === x.id}
            onClick={() => {
              setB(x.id);
              setPick(null);
            }}
          >
            {x.name}
          </button>
        ))}
        <button
          type="button"
          className={s.replay}
          onClick={() => {
            setPick(null);
            setRun((r) => r + 1);
          }}
          aria-label="Replay the month"
        >
          <Rotate size={15} />
        </button>
      </div>

      <div className={s.meter}>
        <div className={s.meterNums}>
          <span>
            <span className={s.meterCap}>Charged so far</span>
            <b className={s.meterBig}>{money(spent)}</b>
          </span>
          <span className={s.meterRight}>
            <span className={s.meterCap}>Monthly limit, 30.4x</span>
            <b>{money(limit)}</b>
          </span>
        </div>
        <span className={s.meterTrack}>
          <i style={{ width: `${Math.min(100, (spent / limit) * 100)}%` }} />
        </span>
      </div>

      <div className={s.cal}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed weekday row
          <span key={i} className={s.wd} aria-hidden="true">
            {d}
          </span>
        ))}
        {DAYS.map((m, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed days
            key={i}
            type="button"
            className={s.day}
            data-in={i < shown ? "" : undefined}
            data-peak={m > 1.5 ? "" : undefined}
            data-top={m > 1.8 ? "" : undefined}
            aria-pressed={pick === i}
            aria-label={`Day ${i + 1}: ${money(m * daily)}`}
            onClick={() => setPick(pick === i ? null : i)}
          >
            <span className={s.dayNo}>{i + 1}</span>
            <i className={s.dayFill} style={{ height: `${(m / 2) * 100}%` }} />
          </button>
        ))}
      </div>

      <div className={s.legend}>
        <span>
          <i className={s.keyTop} /> Top of a day = 2x the daily budget, the
          most one day can cost
        </span>
        <span>
          <i className={s.keyMid} /> Middle line = your average daily budget
        </span>
      </div>

      <div className={s.readout}>
        {day === null
          ? <>
              <span>
                Average daily budget <b>{money(daily)}</b>
              </span>
              <span>
                Most one day can cost <b>{money(ceiling)}</b>
              </span>
              <span>
                The month <b>within {money(limit)}</b>
              </span>
            </>
          : <>
              <span>
                Day {pick + 1} <b>{money(day * daily)}</b>
              </span>
              <span>
                <b>{day.toFixed(1)}x</b> your average daily budget
              </span>
            </>}
      </div>

      {b === "plumb"
        ? <div className={s.aside}>
            {money(limit)} a month buys around 43 clicks at plumbing's $10.49
            average. At 8.05%, that comes to three or four enquiries, too few to
            judge a cost per lead.
          </div>
        : <div className={s.aside}>{budget.note}. Tap a day to see it.</div>}
    </motion.figure>
  );
}

/* ── 3. pay per click or pay per lead ─────────────────────────────────── */

const PEOPLE = [
  { what: "Looks, then leaves", lead: false },
  { what: "Rings you, you answer", lead: true },
  { what: "Reads, then leaves", lead: false },
  { what: "Sends a message", lead: true },
  { what: "Looks, then leaves", lead: false },
  { what: "Leaves a voicemail", lead: true },
  { what: "Sends a booking request", lead: true, us: true },
  { what: "Compares, then leaves", lead: false },
];

const MODES = [
  {
    name: "Search ads",
    unit: "clicks",
    pays: "A click on the ad",
    price: "Your bids against other advertisers",
    control: "Full, search by search, with exclusions",
  },
  {
    name: "Local Services Ads",
    unit: "leads",
    pays: "A valid lead: an answered call, a message, a voicemail or a booking",
    price: "Bids from competing local businesses, by location and job type",
    control: "None, targeting comes from service categories and areas",
  },
];

function Lsa() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [on, setOn] = useState(0);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!seen || touched) return;
    if (reduce) return;
    const t = setTimeout(() => setOn(1), 1600);
    return () => clearTimeout(t);
  }, [seen, touched, reduce]);
  const m = MODES[on];
  const charged = PEOPLE.filter((p) => (on ? p.lead : true)).length;
  const rise = useRise();

  return (
    <motion.figure ref={ref} className={s.lsa} {...rise}>
      <div className={s.head}>
        <span className={s.cap}>What you're charged for</span>
        <span className={s.tag}>Example, simplified</span>
      </div>

      <div className={s.switch} role="tablist" aria-label="Ad type">
        {MODES.map((x, i) => (
          <button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={on === i}
            onClick={() => {
              setTouched(true);
              setOn(i);
            }}
          >
            {x.name}
          </button>
        ))}
        <motion.i
          className={s.knob}
          animate={{ x: on ? "100%" : "0%" }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
        />
      </div>

      <div className={s.crowdCap}>
        Eight people find your ad and tap it this week
      </div>
      <div className={s.crowd}>
        {PEOPLE.map((p, i) => {
          const paid = on ? p.lead : true;
          return (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed example
              key={i}
              className={s.person}
              data-paid={paid ? "" : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={seen ? { opacity: 1, y: 0 } : undefined}
              transition={
                reduce
                  ? NOW
                  : { duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }
              }
            >
              <span className={s.personWhat}>
                {p.what}
                {p.us ? <em>US and Canada only</em> : null}
              </span>
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed example
                key={`${on}-${i}`}
                className={s.price}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduce
                    ? NOW
                    : {
                        type: "spring",
                        stiffness: 500,
                        damping: 26,
                        delay: i * 0.05,
                      }
                }
              >
                {paid ? (on ? "Lead" : "Click") : "Free"}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      <div className={s.bill}>
        <b className={s.billNum}>
          <Tween value={charged} format={(v) => Math.round(v)} />
        </b>
        <span>
          {m.unit} you pay for
          <ArrowRight size={15} className={s.billArrow} />
          {on ? "only the people who got in touch" : "everyone who tapped"}
        </span>
      </div>

      <motion.div
        key={on}
        className={s.facts}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? NOW : { duration: 0.4, ease: EASE }}
      >
        <div className={s.fact}>
          <span>You pay for</span>
          <b>{m.pays}</b>
        </div>
        <div className={s.fact}>
          <span>Who sets the price</span>
          <b>{m.price}</b>
        </div>
        <div className={s.fact}>
          <span>Control over searches</span>
          <b>{m.control}</b>
        </div>
      </motion.div>
    </motion.figure>
  );
}

export const PIECES = {
  "en1-backwards": Backwards,
  "en1-month": Month,
  "en1-lsa": Lsa,
};
