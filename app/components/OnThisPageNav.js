"use client";

import styles from "./OnThisPageNav.module.css";

/**
 * @param {{
 *   items: Array<{ id: string; label: string }>;
 *   className?: string;
 *   headingId?: string;
 * }} props
 */
export default function OnThisPageNav({
  items,
  className = "",
  headingId = "on-this-page-title",
}) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav
      className={`${styles.root} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className={styles.heading}>
        What&apos;s on this page
      </h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={styles.link}
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(null, "", `#${item.id}`);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
