import styles from "./Title.module.css";
import Image from "next/image";
import clientsImage from "../assets/clients.png";

export default function Title({ title, subtitle, width, hasImage, subtitleWidth }) {
  return (
    <header>
      <h1 className={styles.title} style={{ maxWidth: width }}>{title}</h1>
      {hasImage && (
        <Image src={clientsImage} alt="Title Image" />
      )}
      {subtitle != null &&
        (typeof subtitle === "string" ? (
          <p
            className={`${styles.subtitle} ${hasImage ? styles.subtitleWithImage : ""}`}
            style={{ maxWidth: subtitleWidth || width }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        ) : (
          <p
            className={`${styles.subtitle} ${hasImage ? styles.subtitleWithImage : ""}`}
            style={{ maxWidth: subtitleWidth || width }}
          >
            {subtitle}
          </p>
        ))}
    </header>
  );
}
