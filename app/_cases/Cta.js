"use client";

import { Btn, Reveal, useApp } from "../_home/ui";
import s from "./study.module.css";

/** The plain ask at the end of a study. */
export default function CaseCta() {
  const { book } = useApp();
  return (
    <Reveal className={s.cta}>
      <div>
        <h2>Have a similar problem?</h2>
        <p>The first call is free and commits you to nothing.</p>
      </div>
      <Btn variant="white" onClick={() => book()}>
        Get started
      </Btn>
    </Reveal>
  );
}
