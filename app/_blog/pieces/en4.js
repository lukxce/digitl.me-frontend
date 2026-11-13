"use client";

/* Bespoke pieces for "How much does social media management cost per
   month?". Every fact and figure here is in the post; the example week is
   marked "Example" and the scope builder "Simplified".

   en4-fee-builder   pick each row of a quote (posts, shoots, replies,
                     reporting, ads) and see which of the three scopes it
                     lands in, what stays with you, and ad spend kept on a
                     line of its own
   en4-who-runs-it   freelancer, employee or agency: what each includes, and
                     the employee's real cost built up from BLS or ONS
                     figures with a US and UK switch
   en4-reply-week    one example week: posting in bursts, batched posts, or
                     replies in the scope, against the 24 hour reply window */

import {
  AnimatePresence,
  animate,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Clock,
  Layers,
  Megaphone,
  Message,
  Users,
  Video,
} from "../../_home/icons";
import s from "./en4.module.css";

const EASE = [0.16, 1, 0.3, 1];

/* a segmented switch with a sliding knob, for 2 or 3 options */
function Switch({ names, on, pick, label, small }) {
  const n = names.length;
  return (
    <div
      className={s.switch}
      data-small={small ? "" : undefined}
      role="tablist"
      aria-label={label}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      {names.map((x, i) => (
        <button
          key={x}
          type="button"
          role="tab"
          aria-selected={on === i}
          onClick={() => pick(i)}
        >
          {x}
        </button>
      ))}
      <motion.i
        className={s.knob}
        aria-hidden="true"
        style={{ width: `calc((100% - 8px) / ${n})` }}
        animate={{ x: `${on * 100}%` }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    </div>
  );
}

/* moves to `to` once by itself when the piece is in view, unless the reader
   already touched it */
function useAutoPick(ref, to, delay = 1600) {
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const [on, setOn] = useState(0);
  const touched = useRef(false);
  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => {
      if (!touched.current) setOn(to);
    }, delay);
    return () => clearTimeout(t);
  }, [seen, to, delay]);
  const pick = (i) => {
    touched.current = true;
    setOn(i);
  };
  return { seen, on, pick };
}

/* a figure that rolls to its value; English format ("8,900") */
function Roll({ value, prefix = "", run = true }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? value : 0);
  const from = useRef(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setV(value);
      return;
    }
    const c = animate(from.current, value, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (x) => {
        from.current = x;
        setV(x);
      },
    });
    return () => c.stop();
  }, [value, run, reduce]);
  return (
    <>
      {prefix}
      {Math.round(v).toLocaleString("en-GB")}
    </>
  );
}

/* ── 1. what's in a monthly fee ────────────────────────────────────────── */

const SCOPES = [
  "Posting from your material",
  "Managed profile",
  "Full service with video and ads",
];

const ROWS = [
  {
    label: "Posts each month",
    opts: ["Feed posts", "Plus stories", "Plus short video"],
    notes: [
      "A fixed number of feed posts, as photo posts.",
      "Feed posts plus stories, with photo posts and carousels.",
      "Short video such as Reels usually lands in the top scope, since somebody has to film and edit every clip.",
    ],
  },
  {
    label: "Who shoots the content",
    opts: [
      "You send phone photos",
      "Plus stock and graphics",
      "A planned shoot",
    ],
    notes: [
      "Phone photos from the business usually beat stock.",
      "You still send photos of real jobs and your team, and the manager adds stock and designed graphics.",
      "A planned shoot, or filming guided by the manager. An on-site shoot adds cost whichever route you take.",
    ],
  },
  {
    label: "Comments and messages",
    opts: ["You answer them", "In working hours", "Agreed hours, lead route"],
    notes: [
      "If the manager posts on schedule but every reply still lands on you, you're still doing the slowest part of the job.",
      "Answering comments and messages is called community management, and it's often priced as its own line.",
      "Answered within agreed hours, with a route for leads.",
    ],
  },
  {
    label: "Reporting",
    opts: ["Short summary", "Reach and visits", "Visits and enquiries"],
    notes: [
      "A short monthly summary.",
      "A monthly report with reach and visits.",
      "A monthly report tied to visits and enquiries.",
    ],
  },
  {
    label: "Ads",
    opts: ["Not included", "Managed, separate fee"],
    lv: [0, 2],
    notes: [
      "Ad spend sits apart from the fee, since Meta charges it to your own ad account whichever option you pick.",
      "The ads are managed for a separate fee, and the spend is paid to Meta from your account.",
    ],
  },
];

/* the reader starts at the bottom; once in view the rows step up to a
   managed profile, one by one, unless the reader takes over */
const DEMO = [1, 1, 1, 1, 0];

function FeeBuilder() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const [pick, setPick] = useState([0, 0, 0, 0, 0]);
  const [last, setLast] = useState(-1);
  const touched = useRef(false);
  useEffect(() => {
    if (!seen) return;
    const ts = DEMO.map((v, i) =>
      setTimeout(
        () => {
          if (touched.current || !v) return;
          setPick((p) => p.map((x, j) => (j === i ? v : x)));
        },
        700 + i * 420,
      ),
    );
    return () => ts.forEach(clearTimeout);
  }, [seen]);
  const choose = (r, i) => {
    touched.current = true;
    setPick((p) => p.map((x, j) => (j === r ? i : x)));
    setLast(r);
  };
  const lv = Math.max(...pick.map((v, r) => (ROWS[r].lv ? ROWS[r].lv[v] : v)));
  const ads = pick[4] === 1;
  const you = [
    pick[0] === 0 && pick[1] === 0
      ? "Approving the posts"
      : "Approving the monthly plan",
    pick[1] === 0
      ? "Collecting and sending your phone photos"
      : pick[1] === 1
        ? "Sending photos of real jobs and your team"
        : "Joining the shoots",
    pick[2] === 0
      ? "Answering every comment and message"
      : "Answering price and booking questions",
  ];
  const note =
    last >= 0
      ? ROWS[last].notes[pick[last]]
      : "Pick an option in any row to see what it means.";
  return (
    <figure ref={ref} className={s.builder}>
      <div className={s.top}>
        <span className={s.cap}>Build a monthly scope</span>
        <span className={s.tag}>Simplified</span>
      </div>
      <div className={s.rows}>
        {ROWS.map((r, ri) => (
          <div key={r.label} className={s.row}>
            <span className={s.rowLabel}>{r.label}</span>
            <fieldset
              className={s.seg}
              aria-label={r.label}
              style={{
                gridTemplateColumns: `repeat(${r.opts.length}, minmax(0, 1fr))`,
              }}
            >
              {r.opts.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={pick[ri] === i}
                  onClick={() => choose(ri, i)}
                >
                  {o}
                </button>
              ))}
            </fieldset>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${last}-${last >= 0 ? pick[last] : 0}`}
          className={s.rowNote}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28, ease: EASE }}
          aria-live="polite"
        >
          {note}
        </motion.div>
      </AnimatePresence>

      <div className={s.result}>
        <div className={s.land}>
          <span className={s.cap}>Your choices land in</span>
          <div className={s.scopes}>
            {SCOPES.map((x, i) => (
              <span
                key={x}
                className={s.scope}
                data-on={i === lv ? "" : undefined}
                data-past={i < lv ? "" : undefined}
              >
                <i aria-hidden="true">{i + 1}</i>
                <b>{x}</b>
              </span>
            ))}
          </div>
        </div>
        <div className={s.youBox}>
          <span className={s.cap}>Still on you</span>
          <div className={s.you}>
            {you.map((t) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className={s.receipt}>
        <span className={s.cap}>Your quote should show two numbers</span>
        <div className={s.line}>
          <span>
            <b>Management fee</b>
            <small>{SCOPES[lv]}</small>
          </span>
          <em>In the quote</em>
        </div>
        <div className={s.apart} aria-hidden="true">
          <span>Kept apart</span>
        </div>
        <motion.div
          className={s.line}
          data-off={ads ? undefined : ""}
          animate={{ opacity: ads ? 1 : 0.55 }}
          transition={{ duration: 0.35 }}
        >
          <span>
            <b>Ad spend</b>
            <small>
              {ads
                ? "Charged by Meta to the payment method on your own ad account. Each charge shows in Billing & payments."
                : "Not in this quote. If you run ads, Meta still bills them to your own ad account."}
            </small>
          </span>
          <em data-meta="">{ads ? "What Meta charged" : "None"}</em>
        </motion.div>
      </div>
    </figure>
  );
}

/* ── 2. freelancer, employee or agency ─────────────────────────────────── */

const WHO = [
  {
    tab: "Freelancer",
    pay: "Hours or a monthly package",
    fit: "Suits you if you run one network and can send your own photos, with time each week to review the posts.",
    cover: "warn",
    rows: [
      [
        Clock,
        "Holiday and sick days",
        "Posting stops unless they arrange cover",
      ],
      [Layers, "Skills", "Usually one or two of design, copy and video"],
      [Video, "Who shoots content", "You, or a shoot priced separately"],
      [Message, "Replies to messages", "Only if the scope says so"],
      [Users, "Your time to manage", "A weekly review"],
      [Megaphone, "Ads", "Sometimes, often as an extra"],
    ],
  },
  {
    tab: "Employee",
    pay: "Salary plus employer costs",
    fit: "Makes sense once the content and replies, plus the ads, fill a full-time job. Someone in the business also has to manage that person.",
    cover: "mid",
    rows: [
      [
        Clock,
        "Holiday and sick days",
        "You arrange cover for the leave you owe",
      ],
      [Layers, "Skills", "Whatever one hire brings"],
      [Video, "Who shoots content", "The employee, with your phone or kit"],
      [Message, "Replies to messages", "Daily, in working hours"],
      [
        Users,
        "Your time to manage",
        "Line management, tools and a review cycle",
      ],
      [Megaphone, "Ads", "Only if the hire has that skill"],
    ],
  },
  {
    tab: "Agency",
    pay: "A monthly scope",
    fit: "Fits when you want one team to run the plan and the content, with the reporting and the ads tied in and no hire to manage.",
    cover: "ok",
    rows: [
      [Clock, "Holiday and sick days", "The team covers it"],
      [
        Layers,
        "Skills",
        "Design, copy, video, ads and reporting across several people",
      ],
      [
        Video,
        "Who shoots content",
        "You or the agency, with shoots priced in the quote",
      ],
      [Message, "Replies to messages", "Only if the scope says so"],
      [Users, "Your time to manage", "Approving a monthly plan"],
      [Megaphone, "Ads", "Usually offered, with the fee kept apart from spend"],
    ],
  },
];

const COST = [
  {
    tab: "US",
    cur: "$",
    year: "about $106,800",
    month: 8900,
    src: "BLS, public relations specialists, May 2025 median",
    parts: [
      {
        name: "Salary",
        v: 74750,
        shown: "$74,750",
        how: "US median annual wage",
      },
      {
        name: "Benefits",
        v: 32000,
        shown: "about $32,000",
        how: "Wages are 70.0% of private employers' compensation costs, benefits 30.0%",
      },
    ],
    foot: "An all-industry benefits average, so a small firm with thinner benefits may come in below it.",
  },
  {
    tab: "UK",
    cur: "£",
    year: "about £46,300",
    month: 3860,
    src: "ONS, ASHE 2026 provisional median, code 2493",
    parts: [
      {
        name: "Salary",
        v: 40040,
        shown: "about £40,040",
        how: "Full-time median for social media managers",
      },
      {
        name: "National Insurance",
        v: 5260,
        shown: "about £5,260",
        how: "15% on earnings above £5,000 a year",
      },
      {
        name: "Pension",
        v: 1010,
        shown: "about £1,010",
        how: "At least 3% on earnings between £6,240 and £50,270",
      },
    ],
    foot: "An eligible employer can set an Employment Allowance of up to £10,500 against National Insurance, which would wipe out that line for a single hire.",
  },
];

function Build({ run }) {
  const [m, setM] = useState(0);
  const c = COST[m];
  const total = c.parts.reduce((a, p) => a + p.v, 0);
  return (
    <div className={s.build}>
      <div className={s.buildTop}>
        <span className={s.cap}>The real cost of one hire</span>
        <Switch
          names={COST.map((x) => x.tab)}
          on={m}
          pick={setM}
          label="US or UK figures"
          small
        />
      </div>
      <div className={s.stack} aria-hidden="true">
        {c.parts.map((p, i) => (
          <motion.i
            key={`${c.tab}-${p.name}`}
            data-i={i}
            initial={{ width: 0 }}
            animate={{ width: run ? `${(p.v / total) * 100}%` : 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.35 }}
          />
        ))}
      </div>
      <div className={s.parts}>
        {c.parts.map((p, i) => (
          <motion.div
            key={`${c.tab}-${p.name}`}
            className={s.part}
            data-i={i}
            initial={{ opacity: 0, y: 8 }}
            animate={run ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.35 }}
          >
            <span>
              <i aria-hidden="true" />
              {i ? "+ " : ""}
              {p.name}
            </span>
            <b>{p.shown}</b>
            <small>{p.how}</small>
          </motion.div>
        ))}
      </div>
      <div className={s.sum}>
        <div>
          <span>Total a year</span>
          <b>{c.year}</b>
        </div>
        <div className={s.sumMonth}>
          <span>A month</span>
          <b>
            about <Roll value={c.month} prefix={c.cur} run={run} />
          </b>
        </div>
      </div>
      <div className={s.notCounted}>
        <span>Not in this total</span>
        <em>Scheduling and design tools</em>
        <em>Ad spend</em>
        <em>Cover for leave</em>
      </div>
      <div className={s.buildFoot}>
        {c.foot} <span>{c.src}.</span>
      </div>
    </div>
  );
}

function WhoRunsIt() {
  const ref = useRef(null);
  const { seen, on, pick } = useAutoPick(ref, 1, 1500);
  const w = WHO[on];
  return (
    <figure ref={ref} className={s.who}>
      <div className={s.top}>
        <span className={s.cap}>Who runs your profile</span>
      </div>
      <Switch
        names={WHO.map((x) => x.tab)}
        on={on}
        pick={pick}
        label="Freelancer, employee or agency"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={on}
          className={s.whoBody}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <div className={s.pay}>
            <span className={s.cap}>What you pay for</span>
            <b>{w.pay}</b>
            <div className={s.fit}>{w.fit}</div>
          </div>
          {on === 1 ? <Build run={seen} /> : null}
          <div className={s.grid}>
            {w.rows.map(([Icon, k, v], i) => (
              <motion.div
                key={k}
                className={s.cell}
                data-cover={i === 0 ? w.cover : undefined}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: 0.05 + i * 0.05,
                }}
              >
                <span className={s.cellKey}>
                  <Icon size={14} />
                  {k}
                </span>
                <span className={s.cellVal}>{v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </figure>
  );
}

/* ── 3. one example week ───────────────────────────────────────────────── */

const DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
const SAT = 3;

const MODES = [
  {
    tab: "Posting in bursts",
    posts: [2, 1, 0, 0, 0, 0, 0],
    reply: 6,
    by: "You reply",
    text: "A business that posts in bursts usually answers messages in bursts too. The Saturday question hears nothing until Tuesday, and that booking is often already lost.",
  },
  {
    tab: "Batched posts",
    posts: [1, 0, 1, 0, 1, 0, 1],
    reply: 6,
    by: "You reply",
    text: "A manager who batches a month of posts in one afternoon closes the gaps in your feed. The replies stay with you, so the question still waits until Tuesday.",
  },
  {
    tab: "Replies in scope",
    posts: [1, 0, 1, 0, 1, 0, 1],
    reply: 3,
    by: "The manager replies",
    text: "With replies named in the scope, the question is answered within the agreed hours and passed on as a lead. Price and booking questions still come back to you.",
  },
];

function ReplyWeek() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });
  const [on, setOn] = useState(0);
  const [moved, setMoved] = useState(false);
  const m = MODES[on];
  const inside = m.reply - SAT <= 1;
  const show = seen;
  /* the first run plays slowly; a switch the reader makes answers quickly */
  const d = moved ? 0.35 : 1;
  const choose = (i) => {
    setMoved(true);
    setOn(i);
  };
  return (
    <figure ref={ref} className={s.week}>
      <div className={s.top}>
        <span className={s.cap}>One week of a profile</span>
        <span className={s.tag}>Example</span>
      </div>
      <Switch
        names={MODES.map((x) => x.tab)}
        on={on}
        pick={choose}
        label="How the profile is run"
      />
      <div className={s.cal}>
        {DAYS.map((d, i) => (
          <span
            key={d}
            className={s.day}
            data-sat={i === SAT ? "" : undefined}
            style={{ gridColumn: i + 1, gridRow: 1 }}
          >
            {d}
          </span>
        ))}
        <span className={s.lane} style={{ gridRow: 2 }}>
          Posts
        </span>
        {m.posts.map((n, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed days
            key={`${on}-p-${i}`}
            className={s.slot}
            style={{ gridColumn: i + 1, gridRow: 3 }}
          >
            {Array.from({ length: n }, (_, k) => (
              <motion.i
                // biome-ignore lint/suspicious/noArrayIndexKey: post squares
                key={k}
                className={s.post}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={show ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 18,
                  delay: (0.1 + i * 0.07 + k * 0.08) * d,
                }}
              />
            ))}
          </span>
        ))}
        <span className={s.lane} style={{ gridRow: 4 }}>
          Messages
        </span>
        <motion.span
          className={s.band}
          style={{ gridColumn: `${SAT + 1} / ${SAT + 3}`, gridRow: 5 }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <small>24 hours</small>
        </motion.span>
        <span
          className={s.wire}
          style={{
            gridColumn: `${SAT + 1} / ${m.reply + 2}`,
            gridRow: 5,
            "--n": m.reply - SAT + 1,
          }}
          aria-hidden="true"
        >
          <motion.i
            key={on}
            data-late={inside ? undefined : ""}
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9 * d, ease: EASE, delay: 0.7 * d }}
          />
        </span>
        <motion.span
          className={s.msg}
          style={{ gridColumn: SAT + 1, gridRow: 5 }}
          initial={{ opacity: 0, y: 6 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.4 }}
          title="Customer, example: are you free next week?"
        >
          <Message size={15} />
        </motion.span>
        <motion.span
          key={`r-${on}`}
          className={s.reply}
          data-late={inside ? undefined : ""}
          data-same={m.reply === SAT ? "" : undefined}
          style={{ gridColumn: m.reply + 1, gridRow: 5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 20,
            delay: 1.4 * d,
          }}
        >
          <Check size={13} strokeWidth={3} />
        </motion.span>
      </div>
      <div className={s.bubbleRow}>
        <span className={s.bubble}>
          <small>Saturday, Customer, example</small>
          Are you free next week?
        </span>
        <motion.span
          key={on}
          className={s.verdict}
          data-late={inside ? undefined : ""}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.2 }}
        >
          {m.by} on {m.reply === SAT ? "Saturday" : "Tuesday"}
          <em>{inside ? "Inside 24 hours" : "Outside 24 hours"}</em>
        </motion.span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={on}
          className={s.weekText}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-live="polite"
        >
          {m.text}
        </motion.div>
      </AnimatePresence>
      <div className={s.expect}>
        <span className={s.cap}>Consumers who expected a reply</span>
        <div className={s.expectRow}>
          <span>
            <b>14%</b> within the hour
          </span>
          <span>
            <b>24%</b> within one to two hours
          </span>
          <span data-on="">
            <b>68%</b> within 24 hours
          </span>
        </div>
        <small>Sprout Social, Q3 2026 Pulse Survey, 2,250 consumers</small>
      </div>
    </figure>
  );
}

/* reduced motion: transforms switch off, the end state shows */
const calm = (C) =>
  function Calm(props) {
    return (
      <MotionConfig reducedMotion="user">
        <C {...props} />
      </MotionConfig>
    );
  };

export const PIECES = {
  "en4-fee-builder": calm(FeeBuilder),
  "en4-who-runs-it": calm(WhoRunsIt),
  "en4-reply-week": calm(ReplyWeek),
};
