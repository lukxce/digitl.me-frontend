import styles from "./Title.module.css";
import Image from "next/image";
import clientsImage from "../assets/clients.png";

function toCssLength(value) {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export default function Title({
  title,
  subtitle,
  width,
  widthMobile,
  hasImage,
  subtitleWidth,
  subtitleWidthMobile,
  align = 'center',
}) {
  const headerStyle = {
    ...(width != null && { "--title-max-width": toCssLength(width) }),
    ...(widthMobile != null && { "--title-max-width-mobile": toCssLength(widthMobile) }),
    ...((subtitleWidth ?? width) != null && {
      "--subtitle-max-width": toCssLength(subtitleWidth ?? width),
    }),
    ...(subtitleWidthMobile != null && {
      "--subtitle-max-width-mobile": toCssLength(subtitleWidthMobile),
    }),
  };

  return (
    <header
      className={styles.root}
      style={Object.keys(headerStyle).length ? headerStyle : undefined}
    >
      <h1 className={styles.title} style={{ textAlign: align, marginLeft: align === 'left' ? '10px' : 'auto' }}>{title}</h1>
      {hasImage && (
        <Image src={clientsImage} alt="Title Image" />
      )}
      {subtitle != null &&
        (typeof subtitle === "string" ? (
          <p
            className={`${styles.subtitle} ${hasImage ? styles.subtitleWithImage : ""}`}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        ) : (
          <p
            className={`${styles.subtitle} ${hasImage ? styles.subtitleWithImage : ""}`}
          >
            {subtitle}
          </p>
        ))}
    </header>
  );
}
