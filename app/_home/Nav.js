"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../assets/digitl-logo.png";
import { IconInstagram, IconLinkedin, IconX } from "../components/socialIcons";
import { CONTACT } from "./content";
import { ArrowRight, ArrowUpRight, Lock, Mail, Phone } from "./icons";
import n from "./nav.module.css";
import { Btn, EASE, useApp } from "./ui";

// The same menu everywhere: Projects and Journal are their own pages; the rest
// are sections of the homepage (reached by gliding there, or by going home
// first from an inner page). Every page ends with the contact form.
export const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How we work" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export const INNER_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How we work" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

/** A link that glides when it points into this page and navigates otherwise. */
export function NavLink({ href, onGo, children, ...rest }) {
  if (href.startsWith("#"))
    return (
      <a href={href} onClick={(e) => onGo(e, href)} {...rest}>
        {children}
      </a>
    );
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitl.rs",
    Icon: IconInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/digitl-rs",
    Icon: IconLinkedin,
  },
  { label: "X", href: "https://x.com/digitl_rs", Icon: IconX },
];

function Logo({ home, onGo }) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt="" />
      <span>digitl</span>
    </>
  );
  return home
    ? <a
        href="#top"
        className={n.logo}
        aria-label="Digitl, back to top"
        onClick={(e) => onGo(e, "#top")}
      >
        {inner}
      </a>
    : <Link href="/" className={n.logo} aria-label="Digitl, home">
        {inner}
      </Link>;
}

/** The menu panel: pages on the left, how to reach us on the right. */
function Menu({ onClose, onBook, onGo, links }) {
  return (
    <motion.div
      className={n.sheet}
      role="dialog"
      aria-label="Menu"
      initial={{ opacity: 0, y: -10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className={n.sheetMain}>
        <nav className={n.sheetLinks} aria-label="Pages">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                onClose();
                onGo(e, l.href);
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.05 + i * 0.04,
                duration: 0.35,
                ease: EASE,
              }}
            >
              {l.label}
              <ArrowRight size={15} />
            </motion.a>
          ))}
        </nav>
        <a className={n.login} href={CONTACT.hub}>
          <span className={n.loginIcon}>
            <Lock size={16} />
          </span>
          <span className={n.loginText}>
            <b>Client login</b>
            <small>Reports, approvals and requests</small>
          </span>
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className={n.sheetSide}>
        <span className={n.status}>
          <i /> 2 slots open
        </span>
        <a className={n.contact} href={`mailto:${CONTACT.email}`}>
          <span>
            <Mail size={16} />
          </span>
          <b>{CONTACT.email}</b>
        </a>
        <a className={n.contact} href={`tel:${CONTACT.tel}`}>
          <span>
            <Phone size={16} />
          </span>
          <b>{CONTACT.phone}</b>
        </a>
        <div className={n.socials}>
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
        <Btn
          variant="accent"
          size="sm"
          onClick={() => {
            onClose();
            onBook();
          }}
        >
          Get started
        </Btn>
        <span className={n.city}>
          Belgrade & London
          <a href={CONTACT.sr} hrefLang="sr" lang="sr">
            Srpski <ArrowUpRight size={12} />
          </a>
        </span>
      </div>
    </motion.div>
  );
}

/** A plain bar at the top that turns into a small pill and follows the page. */
export default function Nav() {
  const { book, scrollTo, home } = useApp();
  const router = useRouter();
  const links = home ? LINKS : INNER_LINKS;
  // In-page links glide instead of jumping (Lenis is off on phones). Links
  // to another page, with or without a section ("/#services"), go through the
  // router, so they never depend on the browser's own jump to a fragment;
  // the homepage scrolls to the section itself when it arrives (ui.js).
  const go = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#")) scrollTo(href);
    else router.push(href);
  };
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setFloating(window.scrollY > window.innerHeight * 0.55);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    // Close once the page has really moved, not on the first stray scroll
    // event (a settling flick, the toolbar hiding, a late layout shift).
    const y0 = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - y0) > 48) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const menuBtn = (cls) => (
    <button
      type="button"
      className={cls}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
    >
      <span className={n.burger} data-open={open ? "true" : undefined}>
        <i />
        <i />
      </span>
      Menu
    </button>
  );

  return (
    <>
      <header className={n.bar}>
        <Logo home={home} onGo={go} />
        <nav className={n.links} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} onGo={go}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className={n.actions}>
          <a
            className={n.lang}
            href={CONTACT.sr}
            hrefLang="sr"
            lang="sr"
            aria-label="Srpski sajt"
          >
            SR
          </a>
          <Btn
            variant="accent"
            size="sm"
            onClick={() => book()}
            className={n.cta}
          >
            Get started
          </Btn>
          {menuBtn(n.menuBtn)}
        </div>
        <AnimatePresence>
          {open && !floating
            ? <Menu
                onClose={() => setOpen(false)}
                onBook={book}
                onGo={go}
                links={links}
              />
            : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {floating
          ? <motion.div
              className={n.pill}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Logo home={home} onGo={go} />
              <nav className={n.pillLinks} aria-label="Quick links">
                {links.slice(0, 4).map((l) => (
                  <NavLink key={l.href} href={l.href} onGo={go}>
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <span className={n.pillIcons}>
                <a href={`tel:${CONTACT.tel}`} aria-label="Call">
                  <Phone size={15} />
                </a>
                <a href={`mailto:${CONTACT.email}`} aria-label="Email us">
                  <Mail size={15} />
                </a>
              </span>
              {menuBtn(n.pillMenu)}
              <Btn
                variant="accent"
                size="sm"
                arrow={false}
                onClick={() => book()}
              >
                Start
              </Btn>
              <AnimatePresence>
                {open
                  ? <Menu
                      onClose={() => setOpen(false)}
                      onBook={book}
                      onGo={go}
                      links={links}
                    />
                  : null}
              </AnimatePresence>
            </motion.div>
          : null}
      </AnimatePresence>
    </>
  );
}
