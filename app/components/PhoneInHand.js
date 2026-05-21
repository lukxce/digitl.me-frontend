"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clientsAvatar from "../assets/clients.png";
import storyBackground from "../assets/girl-laptop.png";
import handPhone from "../assets/hand-phone.png";
import starsSvg from "../assets/stars.svg";
import styles from "./PhoneInHand.module.css";

const STORY_DURATION_MS = 10_000;

const STORIES = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Product Lead, Northwind",
    body: "Client satisfaction went through the roof after the redesign. Every flow finally feels obvious.",
  },
  {
    id: "2",
    name: "Jordan Lee",
    role: "Marketing Director, Acme",
    body: "We finally have a story that matches how good the product is. Retention looks stronger every week.",
  },
  {
    id: "3",
    name: "Sam Rivera",
    role: "Founder, Brightline",
    body: "The level of care in every screen makes us look like a much bigger team than we are.",
  },
];

export default function PhoneInHand() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [intervalKey, setIntervalKey] = useState(0);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setProgressEpoch((e) => e + 1);
      setActiveIndex((i) => (i + 1) % STORIES.length);
    }, STORY_DURATION_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, intervalKey]);

  const story = STORIES[reducedMotion ? 0 : activeIndex];

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
        <Image
          src={handPhone}
          alt=""
          width={420}
          height={560}
          className={styles.handImage}
          priority={false}
        />
        <div className={styles.screen}>
        <button className={styles.tapLeft} onClick={handleLeft} aria-label="Previous" />
        <button className={styles.tapRight} onClick={handleRight} aria-label="Next" />
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
                data-reduced={reducedMotion || undefined}
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
                      key={i === activeIndex ? `a-${progressEpoch}` : `s-${i}`}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
