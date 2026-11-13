"use client";

/* Bespoke pieces for "Missed call text back vs AI receptionist" (digitl.me).
   en5-call    the caller's phone: the call rings out and the text arrives,
               or the AI receptionist answers and books, as a switch
   en5-prices  the vendors' own prices, 12 Nov 2026, as bars; the AI tab has
               a callers slider that works the per-call prices out
   en5-rules   the US and UK texting rules, switched by market and by what
               the first text says
   Every fact is in the post; example names are marked "Example". */

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Calendar, Check, Message, Rotate, X } from "../../_home/icons";
import s from "./en5.module.css";

const EASE = [0.16, 1, 0.3, 1];

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: EASE },
};

const pop = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", stiffness: 380, damping: 30 },
};

/* A two-way switch in the blog's toggle style. */
function Switch({ options, value, onChange, label, small }) {
  return (
    <div
      className={s.switch}
      data-small={small ? "" : undefined}
      role="tablist"
      aria-label={label}
    >
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          role="tab"
          aria-selected={value === i}
          onClick={() => onChange(i)}
        >
          {o}
        </button>
      ))}
      <motion.i
        className={s.knob}
        aria-hidden="true"
        animate={{ x: value ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    </div>
  );
}

/* ── en5-call ──────────────────────────────────────────────────────────── */

const RUNS = {
  text: {
    times: [0, 2600, 3300, 4300, 5900],
    notes: [
      { at: 1, t: "The call rings out", d: "Nobody is free to pick up." },
      {
        at: 3,
        t: "A text, within seconds",
        d: "From your business number, so the enquiry stays open.",
      },
      {
        at: 4,
        t: "The reply lands in one place",
        d: "A shared inbox or your CRM, until you ring back.",
      },
    ],
    limit: "Text-back can't quote a price or book a slot.",
  },
  ai: {
    times: [0, 1500, 2100, 3600, 4800, 6000, 7300],
    notes: [
      { at: 1, t: "The call is answered", d: "Not missed, even on a job." },
      {
        at: 4,
        t: "It asks your intake questions",
        d: "A cleaner needs the home's size; a plumber, how urgent it is.",
      },
      {
        at: 6,
        t: "It books and texts you a summary",
        d: "Urgent calls go straight to your mobile.",
      },
    ],
    limit: "The risk: a wrong answer in a confident voice.",
  },
};

const FIRST_TEXT =
  "Hi, it's Your Business, sorry we missed you. New quote or existing booking?";

function Dots() {
  return (
    <span className={s.dots} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Screen({ mode, step }) {
  const ringing = step === 0;
  return (
    <div className={s.screen}>
      <div className={s.notch} aria-hidden="true" />
      {/* the call */}
      <div className={s.callTop} data-small={step >= 2 ? "" : undefined}>
        <span className={s.avatar} data-ring={ringing ? "" : undefined}>
          {ringing
            ? <>
                <motion.i
                  className={s.pulse}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.i
                  className={s.pulse}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.65,
                  }}
                />
              </>
            : null}
          YB
        </span>
        <b className={s.callName}>Your Business</b>
        <span
          className={s.callState}
          data-tone={ringing ? "ring" : mode === "text" ? "missed" : "live"}
        >
          {ringing
            ? "Calling…"
            : mode === "text"
              ? step >= 2
                ? "Missed call, just now"
                : "No answer"
              : "Connected"}
        </span>
      </div>

      {/* what follows */}
      <div className={s.thread}>
        {mode === "text"
          ? <>
              {step >= 2
                ? <motion.span className={s.threadHead} {...pop}>
                    <Message size={13} /> Messages
                  </motion.span>
                : null}
              {step === 2
                ? <motion.span className={s.in} {...pop}>
                    <Dots />
                  </motion.span>
                : null}
              {step >= 3
                ? <motion.span className={s.in} {...pop}>
                    {FIRST_TEXT}
                  </motion.span>
                : null}
              {step >= 4
                ? <motion.span className={s.out} {...pop}>
                    New quote, please.
                  </motion.span>
                : null}
            </>
          : <>
              {step >= 2
                ? <motion.span className={s.in} {...pop}>
                    Hi, I'm Your Business's automated assistant. This call is
                    recorded.
                  </motion.span>
                : null}
              {step >= 3
                ? <motion.span className={s.out} {...pop}>
                    I'd like a quote for a regular clean.
                  </motion.span>
                : null}
              {step >= 4
                ? <motion.span className={s.in} {...pop}>
                    How many bedrooms, and how often?
                  </motion.span>
                : null}
              {step >= 5
                ? <motion.span className={s.out} {...pop}>
                    Three bedrooms, fortnightly.
                  </motion.span>
                : null}
              {step >= 6
                ? <motion.span className={s.booked} {...pop}>
                    <Calendar size={14} /> Slot booked, summary texted
                  </motion.span>
                : null}
            </>}
      </div>
    </div>
  );
}

function Call() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const still = useReducedMotion();
  const [mode, setMode] = useState(0); // 0 text-back, 1 AI receptionist
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(0);
  const key = mode ? "ai" : "text";
  const plan = RUNS[key];
  const last = plan.times.length - 1;

  // biome-ignore lint/correctness/useExhaustiveDependencies: restart per mode and replay
  useEffect(() => {
    if (!seen) return;
    if (still) {
      setStep(last);
      return;
    }
    setStep(0);
    const ids = plan.times
      .slice(1)
      .map((t, i) => setTimeout(() => setStep(i + 1), t));
    return () => ids.forEach(clearTimeout);
  }, [seen, still, key, run]);

  return (
    <motion.div ref={ref} className={s.call} {...rise}>
      <div className={s.callBar}>
        <Switch
          options={["Text-back", "AI receptionist"]}
          value={mode}
          onChange={(i) => {
            setMode(i);
            setStep(0);
            setRun((r) => r + 1);
          }}
          label="What happens when you can't pick up"
        />
      </div>
      <div className={s.callGrid}>
        <div className={s.phoneWrap}>
          <span className={s.example}>Example</span>
          <div className={s.phone} aria-hidden="true">
            <Screen key={`${key}${run}`} mode={key} step={step} />
          </div>
          <span className={s.srOnly}>
            {mode
              ? "Example: the AI receptionist answers, says it is an automated assistant and the call is recorded, asks how many bedrooms and how often, then books the slot and texts a summary."
              : `Example: the call goes unanswered, then the caller gets a text from the business number: "${FIRST_TEXT}"`}
          </span>
        </div>
        <div className={s.notes}>
          <span className={s.cap}>
            {mode ? "The caller gets an answer" : "The caller gets a text"}
          </span>
          {plan.notes.map((n, i) => (
            <div
              key={n.t}
              className={s.note}
              data-on={step >= n.at ? "" : undefined}
            >
              <i className={s.noteNo}>
                {step >= n.at ? <Check size={12} strokeWidth={3} /> : i + 1}
              </i>
              <span>
                <b>{n.t}</b>
                <span>{n.d}</span>
              </span>
            </div>
          ))}
          <motion.div
            className={s.limit}
            animate={{ opacity: step >= last ? 1 : 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <X size={12} strokeWidth={3} />
            <span>{plan.limit}</span>
          </motion.div>
          <button
            type="button"
            className={s.replay}
            onClick={() => {
              setStep(0);
              setRun((r) => r + 1);
            }}
            disabled={!still && step < last}
          >
            <Rotate size={14} /> Play again
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── en5-prices ────────────────────────────────────────────────────────── */

const TEXT_PLANS = [
  { name: "Quo", plan: "Starter, a user a month", month: 19, year: 15 },
  { name: "Allo", plan: "Business, a seat a month", month: 45, year: 32 },
  { name: "HighLevel", plan: "Starter, plus usage", month: 97 },
];

const AI_PLANS = [
  {
    name: "Smith.ai",
    plan: "Free for 25 calls, then $3.00 each",
    cost: (n) => Math.max(0, n - 25) * 3,
  },
  {
    name: "Goodcall Starter",
    plan: "$79 for 100 unique customers, then 79 cents each",
    cost: (n) => 79 + Math.max(0, n - 100) * 0.79,
  },
  {
    name: "Goodcall Scale",
    plan: "$299 for 2,000 unique customers",
    cost: () => 299,
  },
];

const usd = (v, dec = 0) =>
  `$${v.toLocaleString("en-GB", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })}`;

function Prices() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const still = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [n, setN] = useState(0);
  const slid = useRef(false);

  // the first time the AI tab opens, the slider runs up to an example month
  useEffect(() => {
    if (tab !== 1 || slid.current) return;
    slid.current = true;
    if (still) {
      setN(120);
      return;
    }
    const c = animate(0, 120, {
      duration: 1.4,
      ease: EASE,
      delay: 0.2,
      onUpdate: (v) => setN(Math.round(v / 5) * 5),
    });
    return () => c.stop();
  }, [tab, still]);

  const aiRows = AI_PLANS.map((p) => ({
    ...p,
    v: Math.round(p.cost(n) * 100) / 100,
  }));
  const aiMax = Math.max(299, ...aiRows.map((r) => r.v));
  const cheapest = Math.min(...aiRows.map((r) => r.v));

  return (
    <motion.figure ref={ref} className={s.prices} {...rise}>
      <div className={s.pricesTop}>
        <Switch
          options={["Text-back plans", "AI receptionist"]}
          value={tab}
          onChange={setTab}
          label="Which plans to compare"
          small
        />
        <span className={s.cap}>Vendors' price pages, 12 Nov 2026</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === 0
          ? <motion.div
              key="text"
              className={s.rows}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {TEXT_PLANS.map((p, i) => (
                <div key={p.name} className={s.row}>
                  <span className={s.rowName}>
                    <b>{p.name}</b>
                    <span>{p.plan}</span>
                  </span>
                  <span className={s.track}>
                    <motion.i
                      className={s.fill}
                      initial={{ width: 0 }}
                      animate={{ width: seen ? `${(p.month / 97) * 100}%` : 0 }}
                      transition={{
                        duration: 1.1,
                        ease: EASE,
                        delay: 0.1 + i * 0.12,
                      }}
                    />
                    {p.year
                      ? <motion.i
                          className={s.fillYear}
                          initial={{ width: 0 }}
                          animate={{
                            width: seen ? `${(p.year / 97) * 100}%` : 0,
                          }}
                          transition={{
                            duration: 1.1,
                            ease: EASE,
                            delay: 0.3 + i * 0.12,
                          }}
                        />
                      : null}
                  </span>
                  <span className={s.rowNum}>
                    <b>{usd(p.month)}</b>
                    <span>
                      {p.year ? `or ${usd(p.year)} yearly` : "a month"}
                    </span>
                  </span>
                </div>
              ))}
              <div className={s.legend}>
                <span>
                  <i data-k="m" /> Billed monthly
                </span>
                <span>
                  <i data-k="y" /> Billed annually
                </span>
              </div>
              <span className={s.foot}>
                Allo has text-back on the Business plan only. HighLevel texts
                every missed call, repeats included, billed as usage.
              </span>
            </motion.div>
          : <motion.div
              key="ai"
              className={s.rows}
              data-k="ai"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className={s.slideTop}>
                <span>
                  <b>{n}</b> new callers in a month
                </span>
                <span className={s.simple}>Simplified</span>
              </div>
              <input
                type="range"
                min={0}
                max={400}
                step={5}
                value={n}
                onChange={(e) => {
                  slid.current = true;
                  setN(Number(e.target.value));
                }}
                className={s.slider}
                style={{ "--p": `${(n / 400) * 100}%` }}
                aria-label="New callers in a month"
              />
              {aiRows.map((r) => (
                <div
                  key={r.name}
                  className={s.row}
                  data-best={r.v === cheapest ? "" : undefined}
                >
                  <span className={s.rowName}>
                    <b>{r.name}</b>
                    <span>{r.plan}</span>
                  </span>
                  <span className={s.track}>
                    <motion.i
                      className={s.fill}
                      animate={{
                        width: `${Math.max(1.5, (r.v / aiMax) * 100)}%`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 32,
                      }}
                    />
                  </span>
                  <span className={s.rowNum}>
                    <b>{r.v === 0 ? "Free" : usd(r.v, r.v % 1 ? 2 : 0)}</b>
                    <span>{r.v === cheapest ? "lowest here" : "a month"}</span>
                  </span>
                </div>
              ))}
              <span className={s.foot}>
                Every caller counted as a new customer making one call; plan
                prices only, before US registration and texts. Not on the
                slider: Allo's AI add-on, $32 per agent on top of Business, and
                Quo's Sona AI credits, which cover about 10 calls before $1.00
                to $0.45 per extra call.
              </span>
            </motion.div>}
      </AnimatePresence>
    </motion.figure>
  );
}

/* ── en5-rules ─────────────────────────────────────────────────────────── */

/* status: "go" (fine), "warn" (needs care), "stop" (needs consent),
   "off" (doesn't apply to this text) */
const RULES = {
  us: [
    {
      name: "A2P 10DLC",
      plain: { s: "warn", tag: "Register first" },
      offer: { s: "warn", tag: "Register first" },
      d: "Twilio has blocked unregistered texts from standard US business numbers since 1 September 2023. Allo quotes approval in 3 to 7 days.",
    },
    {
      name: "TCPA consent",
      plain: {
        s: "go",
        tag: "Keep it plain",
        d: "An automated text to a mobile counts as a call. A one-off reply is allowed only when the consumer asked first, and a missed call isn't clearly that request.",
      },
      offer: {
        s: "stop",
        tag: "Written consent",
        d: "A text that introduces an advertisement needs prior express written consent.",
      },
    },
    {
      name: "STOP replies",
      plain: { s: "warn", tag: "Always" },
      offer: { s: "warn", tag: "Always" },
      d: "A STOP reply revokes consent, and you must honour it within ten business days.",
    },
    {
      name: "AI calling back",
      plain: { s: "off", tag: "Inbound is outside it" },
      offer: { s: "off", tag: "Inbound is outside it" },
      d: "An AI that calls leads back needs prior express consent (FCC, February 2024). One that only answers inbound calls falls outside it.",
    },
  ],
  uk: [
    {
      name: "PECR",
      plain: { s: "warn", tag: "Applies" },
      offer: { s: "warn", tag: "Applies" },
      d: "The ICO treats texts as electronic mail under PECR.",
    },
    {
      name: "Service or marketing",
      plain: {
        s: "go",
        tag: "Service message",
        d: "A reply that only deals with the caller's enquiry looks like a service message.",
      },
      offer: {
        s: "stop",
        tag: "Marketing",
        d: "Add an offer and the whole text becomes marketing.",
      },
    },
    {
      name: "Specific consent",
      plain: {
        s: "off",
        tag: "Once it's marketing",
        d: "Marketing texts to individuals need specific consent.",
      },
      offer: {
        s: "stop",
        tag: "Needed",
        d: "Marketing texts to individuals need specific consent.",
      },
    },
    {
      name: "Soft opt-in",
      plain: { s: "off", tag: "Existing customers" },
      offer: { s: "stop", tag: "Not for new contacts" },
      d: "The soft opt-in for existing customers doesn't cover new contacts. Keep a quote follow-up about that quote.",
    },
  ],
};

function Rules() {
  const [market, setMarket] = useState(0); // 0 US, 1 UK
  const [offer, setOffer] = useState(0); // 0 plain reply, 1 with an offer
  const rows = RULES[market ? "uk" : "us"];
  const mood = offer ? "stop" : "go";
  return (
    <motion.div className={s.rules} {...rise}>
      <div className={s.rulesTop}>
        <div className={s.pick}>
          <span className={s.cap}>Market</span>
          <Switch
            options={["US", "UK"]}
            value={market}
            onChange={setMarket}
            label="Market"
            small
          />
        </div>
        <div className={s.pick}>
          <span className={s.cap}>Your first text</span>
          <Switch
            options={["Plain reply", "With an offer"]}
            value={offer}
            onChange={setOffer}
            label="What your first text says"
            small
          />
        </div>
      </div>

      <div className={s.sms} data-mood={mood}>
        <span className={s.example}>Example</span>
        <span className={s.smsBubble}>
          {FIRST_TEXT}
          <AnimatePresence initial={false}>
            {offer
              ? <motion.em
                  key="offer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  Ask us about [this month's offer].
                </motion.em>
              : null}
          </AnimatePresence>
        </span>
        <motion.span
          key={mood}
          className={s.verdict}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {offer
            ? "The offer turns it into marketing: get consent first."
            : "A plain reply about the call. Ask before any offer."}
        </motion.span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={market}
          className={s.ruleList}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {rows.map((r, i) => {
            const v = offer ? r.offer : r.plain;
            return (
              <motion.div
                key={r.name}
                className={s.rule}
                data-s={v.s}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              >
                <span className={s.ruleHead}>
                  <b>{r.name}</b>
                  <motion.em
                    key={v.tag}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  >
                    {v.tag}
                  </motion.em>
                </span>
                <span className={s.ruleText}>{v.d ?? r.d}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <span className={s.foot}>
        Simplified from the post. Have a lawyer read your wording before you
        switch it on.
      </span>
    </motion.div>
  );
}

export const PIECES = {
  "en5-call": Call,
  "en5-prices": Prices,
  "en5-rules": Rules,
};
