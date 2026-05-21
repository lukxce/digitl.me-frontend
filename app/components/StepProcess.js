'use client';

import {
  motion,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./StepProcess.module.css";
import Image from "next/image";
import ladder from "../assets/ladder.svg";
import OvalIcon from "../assets/Oval.svg";

function LaunchArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <title>Arrow</title>
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StepProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const count = useMotionValue(1);
  const [display, setDisplay] = useState(1);

  useEffect(() => {
    if (!isInView) {
      count.set(1);
      setDisplay(1);
      return;
    }

    const controls = animate(count, 4, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, count]);

  const steps = [
    {
      title: "Discovery call",
      description: "We’ll discuss your goals and vision",
    },
    {
      title: "Custom design",
      description: "I’ll create a custom design tailored to your needs",
    },
    {
      title: "Development",
      description: "The design comes to life with clean, efficient code",
    },
    {
      title: "Launch",
      description: "I’ll help you get your website live and ready for the world",
    },
  ];

  return (
    <div className={styles.root}>
      
      {/* MAIN STEP */}
      <div className={styles.mainStep}>
        <motion.div ref={ref} className={styles.mainStepContent}>
          <h2 className={styles.mainStepNumber}>{display}</h2>
        </motion.div>

        <div className={styles.mainStepText}>
          <h3 className={styles.mainStepTitle}>Step process</h3>
          <p className={styles.mainStepDescription}>
            <span className={styles.mainStepDescriptionBold}>A proven workflow</span> that ensures seamless collaboration and <span className={styles.mainStepDescriptionBold}>outstanding results</span>.
          </p>
        </div>

        <Image src={ladder} alt="Ladder" width={124} height={164} unoptimized className={styles.ladder} />
      </div>

      {/* STEPS */}
      {steps.map((step, index) => {
        const isEven = index % 2 !== 0;
        const isReversed = index % 2 === 0;
        const titleAlign = isReversed ? styles.alignLeft : styles.alignRight;
        const descriptionAlign = isReversed ? styles.alignRight : styles.alignLeft;

        const animation = {
          hidden: {
            opacity: 0,
            x: isEven ? 50 : -50,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
          },
        };

        return (
          <div className={styles.step} key={step.title}>
            
            <motion.h3
              className={`${styles.title} ${titleAlign}`}
              variants={animation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {step.title}
            </motion.h3>

            <div className={styles.stepNumberContainer}>
              <Image src={OvalIcon} alt="Oval" width={26} height={26} unoptimized />
              <p className={styles.stepNumber}>0{index + 1}</p>
            </div>

            <motion.p
              className={`${styles.description} ${descriptionAlign}`}
              variants={animation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {step.description}
            </motion.p>

          </div>
        );
      })}

      <Link href="/contact" className={styles.launchLink}>
        <span>Launch your business</span>
        <LaunchArrowIcon className={styles.launchArrow} />
      </Link>
    </div>
  );
}