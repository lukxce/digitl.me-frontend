"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

function shouldEnableLenis() {
  if (typeof window === "undefined") {
    return false;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const mobileViewport = window.matchMedia("(max-width: 768px)").matches;

  return !reduceMotion && !mobileViewport;
}

export default function SmoothScroll({ children }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 768px)"),
    ];

    const update = () => setEnabled(shouldEnableLenis());

    update();
    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", update);
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", update);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    import("lenis/dist/lenis.css");
  }, [enabled]);

  if (!enabled) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.4,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
