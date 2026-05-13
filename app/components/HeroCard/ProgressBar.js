import styles from "./ProgressBar.module.css";

const TOTAL = 3;

export default function ProgressBar({ activeCount = 2 }) {
  const safe = Math.min(Math.max(activeCount, 0), TOTAL);
  return (
    <div className={styles.track} role="presentation">
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className={`${styles.segment} ${i < safe ? styles.segmentActive : ""}`}
        />
      ))}
    </div>
  );
}
