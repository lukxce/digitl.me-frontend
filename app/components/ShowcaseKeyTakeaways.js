import styles from "./ShowcaseKeyTakeaways.module.css";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @param {{
 *   items: Array<{ title: string; description: string }>;
 *   className?: string;
 * }} props
 */
export default function ShowcaseKeyTakeaways({ items, className = "" }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      id="key-takeaways"
      className={`${styles.root} ${className}`.trim()}
      aria-labelledby="showcase-key-takeaways-title"
    >
      <h2 id="showcase-key-takeaways-title" className={styles.heading}>
        Key Takeaways
      </h2>

      <div className={styles.list}>
        {items.map((item, index) => (
          <article
            key={`${item.title}-${item.description}-${index}`}
            className={styles.item}
          >
            <ArrowIcon className={styles.arrow} />
            <div className={styles.copy}>
              {item.title ? <p className={styles.title}>{item.title}</p> : null}
              {item.description
                ? <p className={styles.description}>{item.description}</p>
                : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
