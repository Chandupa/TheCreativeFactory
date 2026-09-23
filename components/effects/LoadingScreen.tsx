"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FADE_MS = 1000;

/**
 * Black overlay with the spinner, faded out after the page has loaded. Lives in
 * the layout, so it shows on the first page load only — not on every
 * client-side navigation.
 */
export default function LoadingScreen() {
  const pathname = usePathname();
  const [initialPath] = useState(pathname);
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    // Legacy timing: 1s after load on the home page, 0.5s on other pages.
    const delay = initialPath === "/" ? 1000 : 500;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      fadeTimer = setTimeout(() => {
        setPhase("fading");
        removeTimer = setTimeout(() => setPhase("gone"), FADE_MS);
      }, delay);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, [initialPath]);

  if (phase === "gone") return null;

  return (
    <>
      <div className={`loading-screen${phase === "fading" ? " fade-out" : ""}`} aria-hidden="true">
        <div className="loader" />
      </div>
      <noscript>
        <style>{".loading-screen{display:none}"}</style>
      </noscript>
    </>
  );
}
