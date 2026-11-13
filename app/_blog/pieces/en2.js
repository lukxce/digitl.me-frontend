"use client";

/* Bespoke pieces for "How to get your business to show up in ChatGPT and
   Google AI" (digitl.me). Every fact comes from the post:

   en2-answer   a mock AI answer with source chips; tap one to see where
                that part of the answer comes from (ChatGPT search or Google)
   en2-robots   a robots.txt you switch line by line, and what each OpenAI
                crawler (and Googlebot) makes of it
   en2-feeds    the chain from your page to a supporting link in an AI
                Overview, with the three tags or rules that break it */

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  FileText,
  Globe,
  Layers,
  Lock,
  Message,
  Pin,
  Search,
  Users,
  X,
} from "../../_home/icons";
import s from "./en2.module.css";

const EASE = [0.16, 1, 0.3, 1];

/* ── en2-answer ─────────────────────────────────────────────────────────── */

const QUESTION = "Who does end of tenancy cleaning near me?";

const ENGINES = {
  chatgpt: {
    tab: "ChatGPT search",
    who: "ChatGPT",
    answer:
      "Your Company offers end of tenancy cleaning in your town. Its service page lists what the job costs and which areas it covers.",
    chips: [
      {
        name: "Your service page",
        tag: "You can influence",
        kind: "yours",
        Icon: FileText,
        text: "A live search reads the current version of your page and links to it, but only if your robots.txt lets OpenAI's search crawler, OAI-SearchBot, in.",
      },
      {
        name: "Search providers",
        tag: "You can influence",
        kind: "yours",
        Icon: Search,
        text: "ChatGPT search uses third-party search providers and content from partners. Bing is the only provider a primary source names, so submit your sitemap to Bing Webmaster Tools too.",
      },
      {
        name: "Training data",
        tag: "Out of your hands",
        kind: "fixed",
        Icon: Layers,
        text: "The model can also name a business from memory. There's no link, and nothing you fix this month changes it.",
      },
      {
        name: "Business Hub",
        tag: "Beta",
        kind: "yours",
        Icon: Pin,
        text: "Since 10 November 2026 a business can claim a listing and see its mentions and website clicks inside ChatGPT. OpenAI says claiming does not guarantee higher placement.",
      },
      {
        name: "Reviews",
        tag: "Not published",
        kind: "unknown",
        Icon: Users,
        text: "OpenAI doesn't publish whether ChatGPT reads Google reviews. Google says reviews count toward its own local ranking.",
      },
    ],
  },
  google: {
    tab: "Google AI Overviews",
    who: "AI Overview",
    answer:
      "Your Company covers end of tenancy cleaning in your area, with prices and the towns it serves on its service page.",
    chips: [
      {
        name: "Google's index",
        tag: "You can influence",
        kind: "yours",
        Icon: Search,
        text: "A supporting link must be indexed and eligible to be shown in Search with a snippet. Google says there are no additional requirements.",
      },
      {
        name: "Query fan-out",
        tag: "Google's side",
        kind: "fixed",
        Icon: Layers,
        text: "AI Overviews and AI Mode may issue several related searches across subtopics to build one response. A page that answers a customer's question directly can be cited.",
      },
      {
        name: "Business Profile",
        tag: "You can influence",
        kind: "yours",
        Icon: Pin,
        text: "Google says Business Profiles can help your services appear in AI responses. Keep it complete and up to date.",
      },
      {
        name: "Reviews",
        tag: "You can influence",
        kind: "yours",
        Icon: Users,
        text: "Local results rest mainly on relevance, distance and prominence. Prominence draws on how many reviews you have and how many sites link to you.",
      },
    ],
  },
};

function Typed({ text, go, reduced, onDone }) {
  const [n, setN] = useState(reduced ? text.length : 0);
  // biome-ignore lint/correctness/useExhaustiveDependencies: type once
  useEffect(() => {
    if (reduced) {
      setN(text.length);
      onDone?.();
      return;
    }
    if (!go) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, 34);
    return () => clearInterval(id);
  }, [go, reduced, text]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length ? <i className={s.caret} aria-hidden="true" /> : null}
    </>
  );
}

function Answer() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [engine, setEngine] = useState("chatgpt");
  const [asked, setAsked] = useState(false);
  const [open, setOpen] = useState(null);
  const e = ENGINES[engine];
  const ready = asked || reduced;
  const chip = open === null ? null : e.chips[open];

  // once the answer is in, open the first source so the chips read as tappable
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(
      () => setOpen((o) => (o === null ? 0 : o)),
      reduced ? 0 : 1300,
    );
    return () => clearTimeout(t);
  }, [ready, reduced]);

  const pick = (k) => {
    setEngine(k);
    setOpen(0);
  };

  return (
    <div ref={ref} className={s.answer}>
      <div className={s.top}>
        <div className={s.tabs} role="tablist" aria-label="Answer engine">
          {Object.entries(ENGINES).map(([k, x]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={engine === k}
              onClick={() => pick(k)}
            >
              {engine === k
                ? <motion.i
                    layoutId="en2-tab"
                    className={s.tabKnob}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                : null}
              <span>{x.tab}</span>
            </button>
          ))}
        </div>
        <span className={s.tags}>
          <em>Example</em>
          <em>Simplified</em>
        </span>
      </div>

      <div className={s.chat}>
        <div className={s.q}>
          <Typed
            text={QUESTION}
            go={seen}
            reduced={reduced}
            onDone={() => setAsked(true)}
          />
        </div>

        <AnimatePresence mode="wait">
          {ready
            ? <motion.div
                key={engine}
                className={s.a}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className={s.who}>
                  <i aria-hidden="true">
                    <Message size={13} />
                  </i>
                  {e.who}
                </span>
                <div className={s.aText}>
                  <b>Your Company</b>
                  {e.answer.replace("Your Company", "")}
                </div>
                <div className={s.chips}>
                  {e.chips.map((c, i) => (
                    <motion.button
                      key={c.name}
                      type="button"
                      className={s.chip}
                      data-kind={c.kind}
                      aria-pressed={open === i}
                      aria-controls="en2-source"
                      onClick={() => setOpen(open === i ? null : i)}
                      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: reduced ? 0 : 0.35 + i * 0.09,
                        type: "spring",
                        stiffness: 380,
                        damping: 22,
                      }}
                    >
                      <span className={s.chipNo}>{i + 1}</span>
                      <c.Icon size={14} />
                      {c.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            : <motion.div key="wait" className={s.thinking} aria-hidden="true">
                <i />
                <i />
                <i />
              </motion.div>}
        </AnimatePresence>

        <div id="en2-source" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {chip
              ? <motion.div
                  key={`${engine}-${open}`}
                  className={s.source}
                  data-kind={chip.kind}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className={s.sourceHead}>
                    <b>
                      {open + 1}. {chip.name}
                    </b>
                    <em>{chip.tag}</em>
                  </div>
                  <span>{chip.text}</span>
                </motion.div>
              : null}
          </AnimatePresence>
        </div>
      </div>

      <div className={s.hint}>
        Tap a source to see where that part comes from
      </div>
    </div>
  );
}

/* ── en2-robots ─────────────────────────────────────────────────────────── */

const PRESETS = [
  { name: "Open to all", star: "allow", gpt: "none", oai: "none" },
  { name: "No training", star: "allow", gpt: "block", oai: "none" },
  { name: "Blanket block", star: "block", gpt: "none", oai: "none" },
  { name: "Block all, allow search", star: "block", gpt: "none", oai: "allow" },
];

const SEG = {
  star: [
    ["allow", "Allow"],
    ["block", "Disallow"],
  ],
  bot: [
    ["none", "No line"],
    ["allow", "Allow"],
    ["block", "Disallow"],
  ],
};

function Seg({ label, value, options, onChange }) {
  return (
    <div className={s.segRow}>
      <span className={s.segLabel}>{label}</span>
      <div className={s.seg} role="radiogroup" aria-label={label}>
        {options.map(([v, t]) => (
          // biome-ignore lint/a11y/useSemanticElements: styled radio buttons
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            data-v={v}
            onClick={() => onChange(v)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function Robots() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const [r, setR] = useState(PRESETS[1]);
  const set = (k) => (v) => setR((x) => ({ ...x, [k]: v, name: null }));

  // a bot follows its own group when it has one, otherwise the * group
  const eff = (own) => (own === "none" ? r.star : own);
  const viaStar = (own) => own === "none";
  const oai = eff(r.oai);
  const gpt = eff(r.gpt);
  const google = r.star;

  const file = [];
  if (r.gpt !== "none")
    file.push([
      "User-agent: GPTBot",
      r.gpt === "block" ? "Disallow: /" : "Allow: /",
      "gpt",
    ]);
  if (r.oai !== "none")
    file.push([
      "User-agent: OAI-SearchBot",
      r.oai === "block" ? "Disallow: /" : "Allow: /",
      "oai",
    ]);
  file.push([
    "User-agent: *",
    r.star === "block" ? "Disallow: /" : "Allow: /",
    "star",
  ]);

  const rows = [
    {
      bot: "OAI-SearchBot",
      job: "ChatGPT search",
      ok: oai === "allow",
      text:
        oai === "allow"
          ? "Your pages can be shown in ChatGPT search answers."
          : viaStar(r.oai)
            ? "Blocked by the rule for everyone, though it never mentions OpenAI. Your pages aren't shown in ChatGPT search answers, though they can still appear as navigational links."
            : "Your pages aren't shown in ChatGPT search answers, though they can still appear as navigational links.",
    },
    {
      bot: "GPTBot",
      job: "Model training",
      ok: gpt === "allow",
      neutral: true,
      text:
        gpt === "allow"
          ? "Content may be used to train OpenAI's models."
          : "Content is marked as off limits for training. No effect on search.",
    },
    {
      bot: "Googlebot",
      job: "Google and AI Overviews",
      ok: google === "allow",
      text:
        google === "allow"
          ? "Google can crawl your pages, one of the basics it lists for AI features."
          : "Crawling is blocked. Google lists crawling allowed in robots.txt as a basic for AI features.",
    },
    {
      bot: "ChatGPT-User",
      job: "Visits on request",
      info: true,
      text: "Visits a page when a user's request calls for it. Robots.txt rules may not apply, and it doesn't decide what appears in search.",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className={s.robots}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={seen || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={s.robotsTop}>
        <span className={s.cap}>Try a robots.txt</span>
        <span className={s.tags}>
          <em>Example</em>
          <em>Simplified</em>
        </span>
      </div>

      <div className={s.presets}>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            aria-pressed={r.name === p.name}
            onClick={() => setR(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className={s.robotsGrid}>
        <div className={s.controls}>
          <Seg
            label="GPTBot"
            value={r.gpt}
            options={SEG.bot}
            onChange={set("gpt")}
          />
          <Seg
            label="OAI-SearchBot"
            value={r.oai}
            options={SEG.bot}
            onChange={set("oai")}
          />
          <Seg
            label="Everyone (*)"
            value={r.star}
            options={SEG.star}
            onChange={set("star")}
          />
        </div>

        <div className={s.file}>
          <span className={s.fileName}>yourdomain.com/robots.txt</span>
          <code>
            {file.map(([ua, rule, k]) => (
              <motion.span
                key={`${k}-${rule}`}
                className={s.group}
                initial={
                  reduced ? false : { backgroundColor: "rgba(158,243,74,0.55)" }
                }
                animate={{ backgroundColor: "rgba(158,243,74,0)" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <span>{ua}</span>
                <span data-block={rule.startsWith("Disallow") ? "" : undefined}>
                  {rule}
                </span>
              </motion.span>
            ))}
          </code>
        </div>
      </div>

      <motion.div
        key={oai}
        className={s.verdict}
        data-ok={oai === "allow" ? "" : undefined}
        initial={reduced ? false : { scale: 0.97, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <i aria-hidden="true">
          {oai === "allow"
            ? <Check size={16} strokeWidth={3} />
            : <X size={15} strokeWidth={3} />}
        </i>
        <b>
          {oai === "allow"
            ? "ChatGPT search can show your pages"
            : "ChatGPT search can't show your pages"}
        </b>
      </motion.div>

      <div className={s.bots}>
        {rows.map((x) => (
          <div
            key={x.bot}
            className={s.bot}
            data-state={
              x.info ? "info" : x.ok ? "ok" : x.neutral ? "off" : "no"
            }
          >
            <div className={s.botHead}>
              <b>{x.bot}</b>
              <span>{x.job}</span>
              <em>{x.info ? "Info" : x.ok ? "Allowed" : "Blocked"}</em>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={x.text}
                className={s.botText}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {x.text}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className={s.note}>
        <Lock size={14} />
        <span>
          Also check your host or CDN's bot protection. After a change, OpenAI
          says its search systems can take about 24 hours to pick it up.
        </span>
      </div>
    </motion.div>
  );
}

/* ── en2-feeds ──────────────────────────────────────────────────────────── */

const FAULTS = [
  {
    id: "robots",
    name: "Crawling blocked",
    at: 1,
    why: "robots.txt, a CDN or the hosting setup keeps Googlebot out, so the page never reaches the index.",
  },
  {
    id: "noindex",
    name: "noindex tag",
    at: 2,
    why: "A noindex tag keeps the page out of the index, and a supporting link must be indexed.",
  },
  {
    id: "nosnippet",
    name: "nosnippet tag",
    at: 3,
    why: "Say a theme or an old plugin left a nosnippet tag. It limits what Google shows, AI features included, and can keep a good page out of AI Overviews.",
  },
];

const CHAIN = [
  {
    name: "Your service page",
    text: "The important content available as text, with internal links that help Google find it.",
    Icon: FileText,
  },
  {
    name: "Crawled",
    text: "Crawling allowed in robots.txt, and by any CDN or hosting setup.",
    Icon: Globe,
  },
  {
    name: "Indexed",
    text: "The page is in Google's index. Google never guarantees indexing itself.",
    Icon: Search,
  },
  {
    name: "Eligible for a snippet",
    text: "No tag stops Google showing text from the page.",
    Icon: Layers,
  },
  {
    name: "Supporting link in an AI Overview",
    text: "No special markup or AI files needed. For local questions, a complete Business Profile can help your services appear too.",
    Icon: Message,
    side: "Business Profile",
  },
];

function Feeds() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [on, setOn] = useState(() => new Set());
  const broken = FAULTS.filter((f) => on.has(f.id)).sort(
    (a, b) => a.at - b.at,
  )[0];
  const stop = broken ? broken.at : CHAIN.length;
  const go = seen || reduced;

  const flip = (id) =>
    setOn((x) => {
      const n = new Set(x);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div ref={ref} className={s.feeds}>
      <div className={s.robotsTop}>
        <span className={s.cap}>What feeds the answer</span>
        <span className={s.tags}>
          <em>Simplified</em>
        </span>
      </div>

      <div className={s.faults}>
        <span className={s.faultsLabel}>Break it:</span>
        {FAULTS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={on.has(f.id)}
            onClick={() => flip(f.id)}
          >
            <i aria-hidden="true">
              {on.has(f.id) ? <X size={11} strokeWidth={3} /> : null}
            </i>
            {f.name}
          </button>
        ))}
      </div>

      <div className={s.chain}>
        {CHAIN.map((c, i) => {
          const lit = i < stop;
          const isBreak = broken && i === stop;
          return (
            <motion.div
              key={c.name}
              className={s.node}
              data-lit={lit ? "" : undefined}
              data-break={isBreak ? "" : undefined}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: reduced ? 0 : i * 0.16,
              }}
            >
              <div className={s.rail} aria-hidden="true">
                <motion.i
                  className={s.dot}
                  animate={{ scale: lit ? 1 : 0.86 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  {isBreak
                    ? <X size={14} strokeWidth={3} />
                    : <c.Icon size={15} />}
                </motion.i>
                {i < CHAIN.length - 1
                  ? <span className={s.line}>
                      <motion.i
                        initial={reduced ? false : { scaleY: 0 }}
                        animate={{ scaleY: go && i < stop - 1 ? 1 : 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE,
                          delay: reduced
                            ? 0
                            : seen && on.size === 0
                              ? 0.25 + i * 0.16
                              : 0,
                        }}
                      />
                    </span>
                  : null}
              </div>
              <div className={s.nodeBody}>
                <b>{c.name}</b>
                <span>{isBreak ? broken.why : c.text}</span>
                {c.side
                  ? <em className={s.side} data-lit={lit ? "" : undefined}>
                      <Pin size={12} />
                      {c.side}
                    </em>
                  : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        key={broken ? broken.id : "ok"}
        className={s.verdict}
        data-ok={broken ? undefined : ""}
        initial={reduced ? false : { opacity: 0.5, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <i aria-hidden="true">
          {broken
            ? <X size={15} strokeWidth={3} />
            : <Check size={16} strokeWidth={3} />}
        </i>
        <b>
          {broken
            ? "Out of AI Overviews, however good the page is"
            : "Eligible to be shown as a supporting link"}
        </b>
      </motion.div>

      <div className={s.note}>
        <Search size={14} />
        <span>
          Measure it in Search Console: the Performance report, "Web" search
          type, and the Generative AI performance report.
        </span>
      </div>
    </div>
  );
}

export const PIECES = {
  "en2-answer": Answer,
  "en2-robots": Robots,
  "en2-feeds": Feeds,
};
