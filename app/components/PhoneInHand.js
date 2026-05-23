"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import clientsAvatar from "../assets/clients.png";
import storyBackground from "../assets/girl-laptop.png";
import handPhone from "../assets/hand-phone.png";
import phoneFrame from "../assets/phone.png";
import starsSvg from "../assets/stars.svg";
import styles from "./PhoneInHand.module.css";

const STORY_DURATION_MS = 10_000;

const easeOut = [0.22, 1, 0.36, 1];

const phoneVariants = {
  hidden: { y: 120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const sidePanelLeftVariants = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, ease: easeOut, delay: 0.08 },
  },
};

const sidePanelRightVariants = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, ease: easeOut, delay: 0.08 },
  },
};

const STORIES = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Product Lead, Northwind",
    body: "Client satisfaction went through the roof after the redesign. Every flow finally feels obvious.",
    reviewer: "Stanley Black",
    reviewerRole: "Creative Director at Lumina",
  },
  {
    id: "2",
    name: "Jordan Lee",
    role: "Marketing Director, Acme",
    body: "We finally have a story that matches how good the product is. Retention looks stronger every week.",
    reviewer: "Stanley Black",
    reviewerRole: "Creative Director at Lumina",
  },
  {
    id: "3",
    name: "Sam Rivera",
    role: "Founder, Brightline",
    body: "The level of care in every screen makes us look like a much bigger team than we are.",
    reviewer: "Stanley Black",
    reviewerRole: "Creative Director at Lumina",
  },
];

export default function PhoneInHand() {
  const reduceMotion = useReducedMotion() === true;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [intervalKey, setIntervalKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setProgressEpoch((e) => e + 1);
      setActiveIndex((i) => (i + 1) % STORIES.length);
    }, STORY_DURATION_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, intervalKey]);

  const story = STORIES[reduceMotion ? 0 : activeIndex];

  function handleLeft() {
    setActiveIndex((i) => (i - 1 + STORIES.length) % STORIES.length);
    setProgressEpoch((e) => e + 1);
    setIntervalKey((k) => k + 1);
  }

  function handleRight() {
    setActiveIndex((i) => (i + 1) % STORIES.length);
    setProgressEpoch((e) => e + 1);
    setIntervalKey((k) => k + 1);
  }

  return (
    <div className={styles.root}>
      <div className={styles.phoneWrap}>
        <motion.div
          className={styles.sidePanelLeft}
          aria-hidden
          variants={sidePanelLeftVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        />
        <motion.div
          className={styles.phoneGroup}
          variants={phoneVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <Image
            src={handPhone}
            alt=""
            width={420}
            height={560}
            className={styles.handImage}
            priority={false}
          />
          <Image
            src={phoneFrame}
            alt=""
            width={1032}
            height={2108}
            className={styles.phoneImage}
            priority={false}
          />
          <div className={styles.screen}>
            <button
              className={styles.tapLeft}
              onClick={handleLeft}
              aria-label="Previous"
            />
            <button
              className={styles.tapRight}
              onClick={handleRight}
              aria-label="Next"
            />
            <div className={styles.storyLayer}>
              <Image
                src={storyBackground}
                alt=""
                fill
                sizes="339px"
                className={styles.storyBackground}
                priority={false}
              />
              <div className={styles.storyOverlay} aria-hidden />
              <div className={styles.islandBar} aria-hidden />
              <div className={styles.storyInner}>
                <div
                  className={styles.progressRow}
                  data-reduced={reduceMotion || undefined}
                  aria-hidden
                >
                  {STORIES.map((s, i) => (
                    <div key={s.id} className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        data-state={
                          i < activeIndex
                            ? "done"
                            : i === activeIndex
                              ? "active"
                              : "idle"
                        }
                        key={
                          i === activeIndex ? `a-${progressEpoch}` : `s-${i}`
                        }
                      />
                    </div>
                  ))}
                </div>

                <header className={styles.storyHeader}>
                  <div className={styles.avatarRing}>
                    <Image
                      src={clientsAvatar}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.meta}>
                    <p className={styles.posterName}>{story.name}</p>
                    <p className={styles.posterRole}>{story.role}</p>
                  </div>
                </header>

                <div className={styles.storyBody} aria-live="polite">
                  <Image
                    src={starsSvg}
                    alt=""
                    width={69}
                    height={13}
                    className={styles.stars}
                    unoptimized
                  />
                  <p className={styles.storyBodyText}>{story.body}</p>
                  <p className={styles.storyBodyReviewer}>{story.reviewer}</p>
                  <p className={styles.storyBodyReviewerRole}>{story.reviewerRole}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.sidePanelRight}
          aria-hidden
          variants={sidePanelRightVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        />
      </div>
    </div>
  );
}
