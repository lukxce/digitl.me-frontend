"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import bgImage from "../assets/girl-laptop.png";
import CtaButton from "./CtaButton";
import styles from "./CtaWithImageBackground.module.css";

const easeOut = [0.22, 1, 0.36, 1];

export default function CtaWithImageBackground() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.section
      className={styles.root}
      aria-labelledby="cta-with-bg-title"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.7, ease: easeOut }
      }
    >
      <Image
        src={bgImage}
        alt=""
        fill
        className={styles.bg}
        sizes="550px"
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h2 id="cta-with-bg-title" className={styles.title}>
          Your success is my goal
        </h2>
        <p className={styles.description}>
          {
            "I've worked with 55 clients to build impactful websites that drive results."
          }
        </p>
        <div className={styles.ctaWrap}>
          <CtaButton title="Get started" action="/contact" />
        </div>
      </div>
    </motion.section>
  );
}
