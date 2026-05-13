import Image from "next/image";
import Link from "next/link";
import homeIcon from "../assets/home.svg";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.links}>
          <li>
            <Link href="/" className={styles.homeLink} aria-label="Home">
              <Image
                src={homeIcon}
                alt=""
                width={18}
                height={18}
                className={styles.homeIcon}
                unoptimized
              />
            </Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/journal">Journal</Link>
          </li>
          <li className={styles.contactLink}>
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
