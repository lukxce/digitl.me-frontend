"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./Years.module.css";

const easeOut = [0.22, 1, 0.36, 1];

const CURRENT_YEAR = 2026;
const YEARS = [CURRENT_YEAR, 2025, 2024, 2023, 2022];
const YEAR_OPACITIES = [1, 0.5, 0.4, 0.3, 0.2];

function getYearVariants(targetOpacity) {
  return {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: targetOpacity,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };
}

const trackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const stepVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
};

export default function Years() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.div
      className={styles.root}
      variants={trackVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className={styles.track}>
        <span className={styles.line} aria-hidden />

        {YEARS.map((year, index) => {
          const isActive = index === 0;

          return (
            <motion.div
              key={year}
              className={styles.step}
              variants={stepVariants}
            >
              <div className={styles.dotRow}>
                <motion.span
                  className={`${styles.dot} ${isActive ? styles.dotActive : styles.dotInactive}`}
                  variants={reduceMotion ? undefined : dotVariants}
                />
              </div>

              <div className={styles.yearWrap}>
                <motion.span
                  className={isActive ? styles.yearCurrent : styles.yearPast}
                  variants={
                    reduceMotion
                      ? undefined
                      : getYearVariants(YEAR_OPACITIES[index])
                  }
                  style={
                    reduceMotion
                      ? { opacity: YEAR_OPACITIES[index] }
                      : undefined
                  }
                >
                  {year}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
