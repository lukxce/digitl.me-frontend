"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import b from "./base.module.css";
import c from "./contact.module.css";
import { CONTACT, SERVICE_PAGES, SERVICES } from "./content";
import { ArrowRight, Check, Mail, Phone } from "./icons";
import { IconInstagram, IconLinkedin, IconX } from "../components/socialIcons";
import { EASE, useApp } from "./ui";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitl.me",
    Icon: IconInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/digitl-rs",
    Icon: IconLinkedin,
  },
  { label: "X", href: "https://x.com/digitl_rs", Icon: IconX },
];

const TOPICS = [...SERVICE_PAGES.map((s) => s.name), "The whole thing"];

export default function Contact() {
  const { plan, topic, audit } = useApp();
  const [topics, setTopics] = useState([]);
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (topic) setTopics((t) => (t.includes(topic) ? t : [...t, topic]));
  }, [topic]);
  useEffect(() => {
    if (plan)
      setTopics(plan.top.map((id) => SERVICES.find((s) => s.id === id).name));
  }, [plan]);
  // a checked site fills the address in, unless one is already typed
  useEffect(() => {
    if (audit?.host) setSite((v) => v || audit.host);
  }, [audit?.host]);

  const toggle = (t) =>
    setTopics((arr) =>
      arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t],
    );

  async function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter an email address we can reply to.");
      return;
    }
    setError("");
    setState("sending");
    const text = [
      "First conversation (digitl.me)",
      `Interested in: ${topics.length ? topics.join(", ") : "nothing selected"}`,
      site.trim() ? `Website: ${site.trim()}` : null,
      plan ? `Plan from the site: ${plan.answers.join(" | ")}` : null,
      audit?.scores
        ? `Site check (${audit.host}): speed ${audit.scores.performance}, SEO ${audit.scores.seo}, LCP ${audit.metrics?.lcp?.display ?? "?"}`
        : audit?.host
          ? `Site check (${audit.host}) failed: ${audit.error}`
          : null,
      note.trim() ? `Message: ${note.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email: email.trim(), text, company } }),
      });
      if (!res.ok) throw new Error("send");
      setState("done");
    } catch {
      setState("idle");
      setError(
        `Unable to send your message right now. Please try again, or write to ${CONTACT.email}.`,
      );
    }
  }

  return (
    <section className={b.section} data-section="Contact">
      <span id="contact" className={b.anchor} />
      <div className={b.container}>
        <div className={c.panel}>
          <span className={c.glyph} aria-hidden="true" />
          <div className={c.copy}>
            <span className={c.label}>No obligation</span>
            <h2 className={c.title}>Let's build a brand that stands out.</h2>
            <p className={c.text}>
              Fill out the form or reach out directly. We usually respond within
              one business day.
            </p>
            <div className={c.tiles}>
              <a className={c.tile} href={`mailto:${CONTACT.email}`}>
                <span>
                  <b>Email us</b>
                  <em>{CONTACT.email}</em>
                </span>
                <Mail size={18} />
              </a>
              <a className={c.tile} href={`tel:${CONTACT.tel}`}>
                <span>
                  <b>Call</b>
                  <em>{CONTACT.phone}</em>
                </span>
                <Phone size={18} />
              </a>
            </div>
            <div className={c.socials}>
              <span>Follow us</span>
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
            {plan
              ? <p className={c.planNote}>
                  <Check size={14} strokeWidth={3} /> Your plan from the three
                  questions goes with the message.
                </p>
              : null}
          </div>

          <div className={c.card}>
            <AnimatePresence mode="wait" initial={false}>
              {state === "done"
                ? <motion.div
                    key="done"
                    className={c.done}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    role="status"
                  >
                    <span className={c.doneMark}>
                      <Check size={26} strokeWidth={3} />
                    </span>
                    <h3>Message sent.</h3>
                    <p>
                      We will reply to <b>{email.trim()}</b> to arrange a time.
                    </p>
                  </motion.div>
                : <motion.form
                    key="form"
                    className={c.form}
                    onSubmit={submit}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className={c.group}>
                      <span className={c.groupLabel}>
                        What you're interested in
                      </span>
                      <div className={c.chips}>
                        {TOPICS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`${c.chip} ${topics.includes(t) ? c.chipOn : ""}`}
                            aria-pressed={topics.includes(t)}
                            onClick={() => toggle(t)}
                          >
                            {topics.includes(t)
                              ? <Check size={13} strokeWidth={3} />
                              : null}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={c.fields}>
                      <label className={c.field}>
                        <span>Email</span>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </label>
                      <label className={c.field}>
                        <span>
                          Website <em>(optional)</em>
                        </span>
                        <input
                          type="text"
                          inputMode="url"
                          autoComplete="url"
                          placeholder="company.com"
                          value={site}
                          onChange={(e) => setSite(e.target.value)}
                        />
                      </label>
                      <label className={`${c.field} ${c.wide}`}>
                        <span>
                          Message <em>(optional)</em>
                        </span>
                        <textarea
                          rows={3}
                          placeholder="What do you do, and what would you like to change?"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      className={c.honeypot}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      aria-hidden="true"
                    />
                    <button
                      type="submit"
                      className={`${b.btn} ${b.btn_accent} ${c.submit}`}
                      disabled={state === "sending"}
                    >
                      <span>
                        {state === "sending" ? "Sending…" : "Send message"}
                      </span>
                      <span className={b.arrow}>
                        <ArrowRight size={16} />
                      </span>
                    </button>
                    {error
                      ? <p className={c.error} role="alert">
                          {error}
                        </p>
                      : <p className={c.micro}>
                          We answer in person. Sending this commits you to
                          nothing.
                        </p>}
                  </motion.form>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
