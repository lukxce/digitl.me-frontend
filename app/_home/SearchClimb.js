"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import s from "./searchClimb.module.css";

/* The hero's search card. An illustrative search: a kind of business and a
   city, generic rivals, and "yourbusiness.com" climbing from sixth place to
   first. Nothing here is a real result (all names are generic). The reader can type their own business and city and watch the same
   climb. On phones the list shows four rows, so "yourbusiness.com" slides up
   into view from below as it climbs. */

/* Places the reader is likely to type, so the made-up titles can give them
   a capital letter. Longer names come before the names they end with. */
const CITIES = [
  "milton keynes",
  "los angeles",
  "new york",
  "london",
  "manchester",
  "birmingham",
  "leeds",
  "liverpool",
  "bristol",
  "sheffield",
  "newcastle",
  "nottingham",
  "leicester",
  "brighton",
  "cardiff",
  "edinburgh",
  "glasgow",
  "belfast",
  "oxford",
  "cambridge",
  "york",
  "dublin",
  "chicago",
  "toronto",
  "sydney",
  "melbourne",
  "belgrade",
];

const EXAMPLES = [
  {
    q: "boiler repair london",
    key: /boiler|heating/,
    rivals: [
      [
        "fixer-plus.co.uk",
        "Fixer Plus",
        "Boiler repairs, servicing and installation. Call to book a visit.",
      ],
      [
        "callout-24.co.uk",
        "Callout 24",
        "We work on all boiler makes. See the areas we cover.",
      ],
      [
        "prompt-repairs.co.uk",
        "Prompt Repairs",
        "Boiler installation and servicing for homes and business premises.",
      ],
    ],
    mine: "Same-day visits, price up front. See our work and customer reviews.",
  },
  {
    q: "dentist leeds",
    key: /\bdent|tooth|teeth/,
    rivals: [
      [
        "dental-point.co.uk",
        "Dental Point",
        "Fillings, dentures and cosmetic dentistry. Book a check-up by phone.",
      ],
      [
        "smile-workshop.co.uk",
        "Smile Workshop",
        "A practice in the city centre. Open on Saturdays too.",
      ],
      [
        "family-dentist.co.uk",
        "Family Dentist",
        "Check-ups, treatment and teeth whitening for the whole family.",
      ],
    ],
    mine: "Prices up front, Saturday appointments. Meet the team and book online.",
  },
  {
    q: "solicitor bristol",
    key: /solicit|lawyer|legal|attorney|barrister|law firm/,
    rivals: [
      [
        "legal-help-desk.co.uk",
        "Legal Help Desk",
        "Family, employment and commercial law. First consultation by phone.",
      ],
      [
        "solicitors-online.co.uk",
        "Solicitors Online",
        "Find a solicitor by area of law and city.",
      ],
      [
        "city-law-office.co.uk",
        "City Law Office",
        "Representing individuals and companies in court.",
      ],
    ],
    mine: "A clear price for a first consultation. Areas of law, team, online booking.",
  },
  {
    q: "electrician york",
    key: /electri|wiring/,
    rivals: [
      [
        "fixer-plus.co.uk",
        "Fixer Plus",
        "Electrical call-outs, fuse boards and wiring.",
      ],
      [
        "electro-24.co.uk",
        "Electro 24",
        "Emergency call-outs the same day. Call for a visit.",
      ],
      [
        "prompt-repairs.co.uk",
        "Prompt Repairs",
        "Rewiring, sockets and lighting for flats.",
      ],
    ],
    mine: "Same-day visits, price up front. Book online or call.",
  },
];

const GENERIC = {
  rivals: [
    [
      "services-pro.co.uk",
      "Services Pro",
      "Services for individuals and businesses. Call to arrange a time.",
    ],
    [
      "top-choice.co.uk",
      "Top Choice",
      "Compare offers from your city in one place.",
    ],
    [
      "local-area-guide.co.uk",
      "Local Area Guide",
      "Businesses in your area, with contact details and opening hours.",
    ],
  ],
  mine: "Prices, past work and client reviews in one place. Book online.",
};

const START = ["a", "b", "c", "d", "e", "v"];
const FINAL = ["v", "a", "b", "c", "d", "e"];
const STEPS = ["Fast site", "Google profile", "Content", "Reviews", "Ads"];
const SLOTS = [1, 2, 3, 4, 5, 6];
const STOP = Symbol("stop");

function capWords(text) {
  return text.replace(/(^|\s)(\S)/g, (_, sp, ch) => sp + ch.toUpperCase());
}

/* "boiler repair london" -> "Boiler repair London" (cap = false keeps the
   first word lower case, for titles that put a brand in front). */
function pretty(raw, cap) {
  let q = raw.trim().replace(/\s+/g, " ");
  const low = q.toLowerCase();
  for (const city of CITIES) {
    if (low === city || low.endsWith(` ${city}`)) {
      q = q.slice(0, q.length - city.length) + capWords(city);
      break;
    }
  }
  return cap ? q.charAt(0).toUpperCase() + q.slice(1) : q;
}

/* The path of a made-up address: plain letters only, so accents are
   dropped first ("café" -> "cafe") whatever language the reader types in. */
function slug(raw) {
  const out = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 26)
    .replace(/-+$/, "");
  return out || "services";
}

function matchSet(q) {
  const low = q.toLowerCase();
  return EXAMPLES.find((ex) => ex.key.test(low)) ?? GENERIC;
}

function build(q, set) {
  const Q = pretty(q, true);
  const lower = pretty(q, false);
  const path = slug(q);
  const [a, b, c] = set.rivals;
  return {
    a: {
      host: a[0],
      path,
      letter: a[1][0],
      tone: "ink",
      title: `${Q} | ${a[1]}`,
      text: a[2],
    },
    b: {
      host: b[0],
      path: "services",
      letter: b[1][0],
      tone: "spark",
      title: `${b[1]}: ${lower}`,
      text: b[2],
    },
    c: {
      host: c[0],
      path: "prices",
      letter: c[1][0],
      tone: "lime",
      title: `${Q}, price list`,
      text: c[2],
    },
    d: {
      host: "business-listings.co.uk",
      path: "search",
      letter: "B",
      tone: "mist",
      title: `${Q}: addresses and phone numbers`,
      text: "A list of businesses with addresses, phone numbers and opening hours.",
    },
    e: {
      host: "ask-a-neighbour.co.uk",
      path: "topics",
      letter: "A",
      tone: "pale",
      title: `“${lower}”: reviews and recommendations`,
      text: "People share their experiences of businesses in their area.",
    },
    v: {
      host: "yourbusiness.com",
      path,
      letter: "Y",
      tone: "mine",
      title: `${Q} | Your business`,
      text: set.mine,
      mine: true,
    },
  };
}

function up(order) {
  const i = order.indexOf("v");
  if (i <= 0) return order;
  const next = order.slice();
  next[i] = next[i - 1];
  next[i - 1] = "v";
  return next;
}

const SPRING = { type: "spring", stiffness: 300, damping: 32, mass: 0.9 };

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pointer() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 4.5v9.2l-1.6-1.5a1.8 1.8 0 0 0-2.6 2.5l4.6 5a4 4 0 0 0 3 1.3h2.8a4.3 4.3 0 0 0 4.3-4.3v-4.4a1.6 1.6 0 0 0-3.2 0V11a1.6 1.6 0 0 0-3.2-.6V10a1.6 1.6 0 0 0-3.2 0V4.5a1.5 1.5 0 0 0-3 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SearchClimb({ footer = null }) {
  const reduce = useReducedMotion();
  const first = EXAMPLES[0];
  const [typed, setTyped] = useState(first.q);
  const [query, setQuery] = useState(first.q);
  const [items, setItems] = useState(() => build(first.q, first));
  const [order, setOrder] = useState(START);
  const [phase, setPhase] = useState("shown");
  const [run, setRun] = useState(0);
  const [user, setUser] = useState(false);
  const [asked, setAsked] = useState(false);

  const root = useRef(null);
  const inputRef = useRef(null);
  const token = useRef(0);
  const visible = useRef(false);
  const wakers = useRef([]);
  const typedRef = useRef(first.q);
  const userRef = useRef(false);
  const phaseRef = useRef("shown");
  const nextEx = useRef(1);

  const type = (v) => {
    typedRef.current = v;
    setTyped(v);
  };
  const go = (p) => {
    phaseRef.current = p;
    setPhase(p);
  };

  /* A pause that also holds while the card is off screen, and gives up as
     soon as a newer run has started. */
  const napper = (t) => (ms) =>
    new Promise((resolve, reject) => {
      const check = () => {
        if (t !== token.current) return reject(STOP);
        if (!visible.current) {
          wakers.current.push(check);
          return;
        }
        resolve();
      };
      setTimeout(check, ms);
    });

  const play = async (t, q, set, mode) => {
    const sleep = napper(t);
    if (mode === "type") {
      go("out");
      await sleep(420);
      let cur = typedRef.current;
      while (cur.length) {
        cur = cur.slice(0, -1);
        type(cur);
        await sleep(16);
      }
      go("typing");
      await sleep(280);
      for (let i = 1; i <= q.length; i += 1) {
        type(q.slice(0, i));
        await sleep(q[i - 1] === " " ? 150 : 55 + ((i * 37) % 45));
      }
      await sleep(420);
    }
    if (mode === "warm") {
      await sleep(1000);
    } else {
      go("loading");
      await sleep(640);
      setQuery(q);
      setItems(build(q, set));
      setOrder(START);
      setRun((r) => r + 1);
      go("shown");
      await sleep(1250);
    }
    go("climb");
    for (let k = 1; k <= STEPS.length; k += 1) {
      setOrder(up);
      await sleep(k === STEPS.length ? 620 : 880);
    }
    go("top");
  };

  // on screen or not: the auto play holds while hidden
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (!e.isIntersecting) return;
        const queued = wakers.current;
        wakers.current = [];
        for (const f of queued) f();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the example loop, until the reader takes over
  // biome-ignore lint/correctness/useExhaustiveDependencies: helpers only touch refs and setters
  useEffect(() => {
    if (reduce) {
      setOrder(FINAL);
      go("top");
      return;
    }
    const t = ++token.current;
    const sleep = napper(t);
    (async () => {
      if (!userRef.current) await play(t, first.q, first, "warm");
      for (;;) {
        await sleep(2800);
        if (userRef.current) return;
        const ex = EXAMPLES[nextEx.current % EXAMPLES.length];
        nextEx.current += 1;
        await play(t, ex.q, ex, "type");
      }
    })().catch(() => {});
    return () => {
      if (token.current === t) token.current += 1;
    };
  }, [reduce]);

  useEffect(
    () => () => {
      token.current += 1;
    },
    [],
  );

  const takeOver = () => {
    if (userRef.current) return;
    userRef.current = true;
    setUser(true);
    // mid typing or between queries: stop there and show the last results
    const p = phaseRef.current;
    if (p === "out" || p === "typing" || p === "loading") {
      token.current += 1;
      type(query);
      go(order[0] === "v" ? "top" : "shown");
    }
  };

  const onFocus = (e) => {
    takeOver();
    const el = e.currentTarget;
    requestAnimationFrame(() => el.select());
  };

  const submit = (e) => {
    e.preventDefault();
    takeOver();
    const q = typedRef.current.trim().replace(/\s+/g, " ");
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    setAsked(true);
    inputRef.current?.blur();
    const t = ++token.current;
    const set = matchSet(q);
    if (reduce) {
      setQuery(q);
      setItems(build(q, set));
      setOrder(FINAL);
      setRun((r) => r + 1);
      go("top");
      return;
    }
    play(t, q, set, "go").catch(() => {});
  };

  const live = phase === "shown" || phase === "climb" || phase === "top";
  const pos = order.indexOf("v");
  const top = phase === "top";

  let hint = (
    <>
      <Pointer />
      <span className={s.long}>Try it with your own business and city</span>
      <span className={s.short}>Try your own business</span>
    </>
  );
  if (asked)
    hint = (
      <>
        Results for <b>“{query}”</b>
      </>
    );
  else if (user) hint = "Press Enter or Search";

  return (
    <div className={s.stage} ref={root}>
      <div className={s.deck}>
        <div className={s.card}>
          <form className={s.bar} onSubmit={submit} role="search">
            <span className={s.lens}>
              <SearchIcon />
            </span>
            <label className={s.field}>
              <span className={s.sr}>Business and city</span>
              <input
                ref={inputRef}
                className={s.input}
                value={typed}
                onChange={(e) => {
                  takeOver();
                  type(e.target.value);
                }}
                onFocus={onFocus}
                placeholder={user ? "Business and city, e.g. barber leeds" : ""}
                enterKeyHint="search"
                autoComplete="off"
                spellCheck={false}
                maxLength={48}
              />
              <span className={s.ghost} aria-hidden>
                {typed}
                <i className={s.caret} data-on={phase === "typing"} />
              </span>
            </label>
            <button type="submit" className={s.go}>
              Search
            </button>
            <span className={s.load} data-on={phase === "loading"} />
          </form>

          <div className={s.meta}>
            <span className={s.hint} data-user={user}>
              {hint}
            </span>
            <span className={s.rank} data-top={top && live}>
              Your site
              <span className={s.rankNo}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.b
                    key={live ? pos : "x"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {live ? `#${pos + 1}` : "…"}
                  </motion.b>
                </AnimatePresence>
              </span>
            </span>
          </div>

          <div className={s.list}>
            <ol className={s.rail} aria-hidden>
              {SLOTS.map((n) => (
                <li
                  key={n}
                  data-on={live && n === pos + 1}
                  data-top={live && top && n === 1}
                >
                  {n}
                </li>
              ))}
            </ol>

            <div className={s.stack}>
              <ul className={s.skel} data-on={!live} aria-hidden>
                {SLOTS.map((n) => (
                  <li key={n} className={s.skelRow}>
                    <span className={s.skelFav} />
                    <span className={s.skelLines}>
                      <i style={{ width: `${34 + ((n * 17) % 22)}%` }} />
                      <i style={{ width: `${62 + ((n * 23) % 28)}%` }} />
                      <i style={{ width: `${70 + ((n * 13) % 22)}%` }} />
                    </span>
                  </li>
                ))}
              </ul>

              <ul className={s.rows} data-on={live} aria-live="polite">
                {order.map((id) => {
                  const it = items[id];
                  return (
                    <motion.li
                      key={`${run}-${id}`}
                      layout="position"
                      className={s.row}
                      data-mine={it.mine || undefined}
                      data-top={(it.mine && top) || undefined}
                      initial={run === 0 ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        layout: reduce ? { duration: 0 } : SPRING,
                        default: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: START.indexOf(id) * 0.06,
                        },
                      }}
                    >
                      <span className={s.fav} data-tone={it.tone}>
                        {it.letter}
                      </span>
                      <span className={s.body}>
                        <span className={s.url}>
                          <b>{it.host}</b>
                          <span className={s.path}>› {it.path}</span>
                          {it.mine
                            ? <em className={s.tag}>Your site</em>
                            : null}
                        </span>
                        <span className={s.title}>{it.title}</span>
                        <span className={s.text}>{it.text}</span>
                      </span>
                      <AnimatePresence>
                        {it.mine && top
                          ? <motion.span
                              className={s.badge}
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 18,
                              }}
                            >
                              #1
                            </motion.span>
                          : null}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}
