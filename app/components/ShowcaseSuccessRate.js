import styles from "./ShowcaseSuccessRate.module.css";

/**
 * @param {{
 *   items: Array<{ title: string; subtitle: string }>;
 *   className?: string;
 * }} props
 */
export default function ShowcaseSuccessRate({ items, className = "" }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      id="success-metrics"
      className={`${styles.root} ${className}`.trim()}
      aria-label="Project success metrics"
    >
      <div className={styles.row}>
        {items.map((item, index) => (
          <div
            key={`${item.title}-${item.subtitle}-${index}`}
            className={styles.item}
          >
            {item.title ? <p className={styles.title}>{item.title}</p> : null}
            {item.subtitle
              ? <p className={styles.subtitle}>{item.subtitle}</p>
              : null}
          </div>
        ))}
      </div>
    </section>
  );
}
