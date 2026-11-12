"use client";

import { motion } from "motion/react";
import { useState } from "react";
import b from "./base.module.css";
import { SERVICE_PAGES } from "./content";
import { ArrowRight, Rotate, Search } from "./icons";
import s from "./services.module.css";
import { SCENES } from "./StickerScenes";
import { Bridge, EASE, Head, useApp } from "./ui";

/* ── one small looping scene per service, drawn in CSS ─────────────────── */
/* ads: clicks from Google and Meta travel into an enquiry inbox */
const INBOX = ["From Google", "From Instagram", "From Google"];
function ArtAds() {
  return (
    <span className={s.artAds}>
      <span className={s.src} data-src="g">
        <i>G</i> Search
      </span>
      <span className={s.src} data-src="m">
        <i>M</i> Meta
      </span>
      <svg className={s.paths} viewBox="0 0 220 150" aria-hidden="true">
        <path d="M70 34 C 110 34, 110 70, 142 70" />
        <path d="M70 112 C 110 112, 110 82, 142 82" />
      </svg>
      <i className={`${s.dot} ${s.dotG}`} />
      <i className={`${s.dot} ${s.dotM}`} />
      <span className={s.inbox}>
        <em>New enquiries</em>
        {INBOX.map((t, k) => (
          <span
            key={k}
            className={s.inRow}
            style={{ animationDelay: `${0.9 + k * 1.1}s` }}
          >
            <i />
            {t}
          </span>
        ))}
      </span>
    </span>
  );
}

function ArtSeo() {
  return (
    <span className={s.artSeo}>
      <span className={s.searchBar}>
        <Search size={11} strokeWidth={2.6} /> what your customers search
      </span>
      <span className={s.results}>
        {[0, 1, 2].map((k) => (
          <span key={k} className={s.result}>
            <i />
            <span />
          </span>
        ))}
        <span className={`${s.result} ${s.resultYou}`}>
          <i />
          <span />
          <em>you</em>
        </span>
      </span>
    </span>
  );
}

/* web: a site assembles itself, then scores 100 across the board */
function ArtWeb() {
  return (
    <span className={s.artWeb}>
      <span className={s.browser}>
        <span className={s.chrome}>
          <span className={s.lights}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.url}>
            yourcompany.com
            <i className={s.urlLoad} />
          </span>
        </span>
        <span className={s.page}>
          <span className={s.pNav}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.pHero}>
            <span className={s.pText}>
              <i />
              <i />
              <b>Order</b>
            </span>
            <span className={s.pImg} />
          </span>
          <span className={s.pCards}>
            <i />
            <i />
            <i />
          </span>
        </span>
      </span>
      <span className={s.scores}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} style={{ animationDelay: `${k * 0.08}s` }}>
            100
          </span>
        ))}
      </span>
    </span>
  );
}

function ArtSocial() {
  return (
    <span className={s.artSocial}>
      {Array.from({ length: 9 }, (_, k) => (
        <i key={k} style={{ animationDelay: `${k * 0.22}s` }} />
      ))}
      <span className={s.heart}>♥</span>
    </span>
  );
}

function ArtBrand() {
  return (
    <span className={s.artBrand}>
      <i className={s.swA} />
      <i className={s.swB} />
      <i className={s.swC} />
      <b className={s.mark}>Aa</b>
    </span>
  );
}

const ART = {
  ads: ArtAds,
  seo: ArtSeo,
  web: ArtWeb,
  social: ArtSocial,
  brand: ArtBrand,
};

function Card({ x, i, rank, wide, onAsk, look }) {
  const [flipped, setFlipped] = useState(false);
  const Art = ART[x.id];
  return (
    <motion.li
      layout
      className={`${s.cell} ${wide ? s.wide : ""}`}
      transition={{ layout: { duration: 0.7, ease: EASE } }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={s.flip} data-flipped={flipped}>
        <div className={s.inner}>
          <button
            type="button"
            className={s.front}
            data-tone={x.id}
            onClick={() => setFlipped(true)}
            tabIndex={flipped ? -1 : 0}
            aria-label={`${x.title}. Turn over for the details.`}
          >
            <span className={s.frontTop}>
              <span className={s.no}>0{i + 1}</span>
              {rank >= 0
                ? <span className={s.badge}>For you #{rank + 1}</span>
                : null}
            </span>
            <span className={s.art}>
              {(() => {
                // /v2: the same story, drawn as stickers
                const Scene = look === "v2" ? SCENES[x.id] : Art;
                return <Scene />;
              })()}
            </span>
            <span className={s.frontText}>
              <b>{x.title}</b>
              <em>{x.body}</em>
            </span>
            <span className={s.hint}>
              <Rotate size={13} /> Turn over
            </span>
          </button>

          {/* The other side of the same card, in the same colour: what we
              do, what is in it, what we measure. */}
          <div className={s.back} data-tone={x.id} aria-hidden={!flipped}>
            <div className={s.backTop}>
              <span className={s.backName}>
                <i>0{i + 1}</i>
                {x.name}
              </span>
              <button
                type="button"
                className={s.unflip}
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? 0 : -1}
              >
                <Rotate size={13} /> Back
              </button>
            </div>
            <div className={s.backBody}>
              <p className={s.lead}>{x.lead}</p>
              <ul className={s.rows}>
                {x.includes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={s.fact}>
                <em>{x.fact[0]}</em>
                <b>{x.fact[1]}</b>
              </p>
              <div className={s.actions}>
                <button
                  type="button"
                  className={s.ask}
                  onClick={() => onAsk(x.name)}
                  tabIndex={flipped ? 0 : -1}
                >
                  Start a conversation <ArrowRight size={14} />
                </button>
                <a
                  className={s.more}
                  href={x.page}
                  tabIndex={flipped ? 0 : -1}
                >
                  More about this service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Services({ look }) {
  const { plan, book } = useApp();
  // Top row, wide: paid ads (or the plan's first pick) and AI; below, the
  // other four as squares (Luka, 13 Nov 2026)
  const order = plan
    ? [plan.ranked[0], "ai", ...plan.ranked.slice(1)]
    : ["ads", "ai", "seo", "web", "social", "brand"];
  const list = order.map((id) => SERVICE_PAGES.find((x) => x.id === id));

  return (
    <section className={b.section} data-section="Services">
      <div className={b.container}>
        <div className={s.top}>
          <Head
            id="services"
            label="Services"
            title="What we do."
            intro="The full marketing function, handled as one system, not a menu of disconnected services. Turn a card over for the details."
          />
          {plan
            ? <p className={s.planNote}>
                Ordered by your plan. <b>The first two</b> are where we would
                start.
              </p>
            : null}
        </div>
        <ul className={s.grid}>
          {list.map((x, i) => (
            <Card
              key={x.id}
              x={x}
              i={i}
              rank={plan ? plan.top.indexOf(x.id) : -1}
              wide={i < 2}
              onAsk={book}
              look={look}
            />
          ))}
        </ul>
        <Bridge
          text="That's what we do. Here's how it looks when we do it for you."
          to="#process"
          label="How we work"
        />
      </div>
    </section>
  );
}
