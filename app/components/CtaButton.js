"use client";

import Link from "next/link";
import styles from "./CtaButton.module.css";

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
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

export default function CtaButton({ title, action }) {
  const body = (
    <>
      <span className={styles.title}>{title}</span>
      <span className={styles.iconCircle}>
        <ArrowIcon />
      </span>
    </>
  );

  if (typeof action === "string") {
    return (
      <Link href={action} className={styles.root}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.root} onClick={action}>
      {body}
    </button>
  );
}
