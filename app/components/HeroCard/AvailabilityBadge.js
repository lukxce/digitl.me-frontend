import styles from "./AvailabilityBadge.module.css";

export default function AvailabilityBadge({
  slotsLabel = "2 open slots",
  periodLabel = "for December",
}) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <span className={styles.dot} aria-hidden />
        <p className={styles.slots}>{slotsLabel}</p>
      </div>
      <p className={styles.period}>{periodLabel}</p>
    </div>
  );
}
