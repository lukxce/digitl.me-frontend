/* Bespoke pieces, one file per post (see digitl.rs for the pattern). */
import { PIECES as en1 } from "./en1";
import { PIECES as en2 } from "./en2";
import { PIECES as en3 } from "./en3";
import { PIECES as en4 } from "./en4";
import { PIECES as en5 } from "./en5";

export const BESPOKE = { ...en1, ...en2, ...en3, ...en4, ...en5 };
