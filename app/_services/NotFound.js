"use client";

import Link from "next/link";
import b from "../_home/base.module.css";
import { SERVICE_PAGES } from "../_home/content";
import { ArrowRight } from "../_home/icons";
import { Btn, Reveal, useApp } from "../_home/ui";
import n from "./notFound.module.css";
import { STICKERS } from "./Stickers";
import u from "./usluge.module.css";

/* short line under each name; the ones content.js lacks are taken from
   that service's own rows */
const SUB = {
  seo: "Content, technical and local SEO",
  web: "Websites, online shops, custom tools",
  social: "Planning, content and publishing",
};

/* The 404: says plainly the page is gone, then hands the visitor the six
   service pages and the two ways forward (home, a call). */
export default function NotFound() {
  const { openBooking } = useApp();
  return (
    <section className={u.hero}>
      <div className={`${b.container} ${u.heroGrid}`}>
        <div className={u.heroCopy}>
          <span className={b.label}>Error 404</span>
          <h1 className={`${b.display} ${u.title}`}>
            This page doesn't exist.
          </h1>
          <p className={u.lead}>
            The address may have changed or the page has been removed. Pick
            the service you're interested in or go back to the homepage.
          </p>
          <div className={u.ctas}>
            <Btn variant="accent" href="/">
              Homepage
            </Btn>
            <Btn variant="ghost" arrow={false} onClick={() => openBooking()}>
              Book a call
            </Btn>
          </div>
        </div>
        <ul className={n.grid}>
          {SERVICE_PAGES.map((s, i) => {
            const Sticker = STICKERS[s.id];
            return (
              <Reveal as="li" key={s.id} i={i}>
                <Link href={s.page} className={n.tile}>
                  <span className={n.sticker} aria-hidden="true">
                    <Sticker size="100%" />
                  </span>
                  <span className={n.text}>
                    <b>{s.footer}</b>
                    <small>{s.sub || SUB[s.id]}</small>
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
