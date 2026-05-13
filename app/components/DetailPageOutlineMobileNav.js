"use client";

import OnThisPageNav from "./OnThisPageNav";
import styles from "./DetailPageOutline.module.css";
import { useOutlineItems } from "./detailPageOutlineContext";

export default function DetailPageOutlineMobileNav() {
  const items = useOutlineItems();
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={styles.mobileNav}>
      <OnThisPageNav
        items={items}
        headingId="on-this-page-mobile-title"
        className={styles.mobileOutline}
      />
    </div>
  );
}
