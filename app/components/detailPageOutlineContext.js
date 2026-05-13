"use client";

import { createContext, useContext } from "react";

/** @type {import("react").Context<Array<{ id: string; label: string }> | null>} */
const OutlineContext = createContext(null);

/**
 * @param {{
 *   items: Array<{ id: string; label: string }>;
 *   children: import("react").ReactNode;
 * }} props
 */
export function OutlineProvider({ items, children }) {
  return (
    <OutlineContext.Provider value={items}>{children}</OutlineContext.Provider>
  );
}

export function useOutlineItems() {
  return useContext(OutlineContext);
}
