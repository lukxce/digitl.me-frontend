
import styles from "./Title.module.css";

export default function Title({ title, subtitle, width }) {
  return (
    <header>
      <h1 className={styles.title} style={{ maxWidth: width }}>{title}</h1>
      <p className={styles.subtitle} style={{ maxWidth: width }}>{subtitle}</p>
    </header>
  );
}
