import Image from "next/image";
import logoMock from "../assets/logo-mock.svg";
import styles from "./ClientsLogosCarousel.module.css";

const LOGO_COUNT = 5;
const items = Array.from({ length: LOGO_COUNT }, (_, id) => id);

function LogoRow({ keyPrefix }) {
  return items.map((id) => (
    <div key={`${keyPrefix}-${id}`} className={styles.logoItem}>
      <Image src={logoMock} alt="" width={104} height={28} unoptimized />
    </div>
  ));
}

export default function ClientsLogosCarousel(props) {
  const { title } = props;
  return (
    <div className={styles.root}>
      {title && <p className={styles.label}>{title}</p>}
      <div className={styles.viewport}>
        <div className={styles.track}>
          <LogoRow keyPrefix="marquee-a" />
          <LogoRow keyPrefix="marquee-b" />
        </div>
      </div>
    </div>
  );
}
