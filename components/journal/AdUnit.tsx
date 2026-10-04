"use client";

import { useEffect, useRef, type CSSProperties } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** <ins> elements already handed to AdSense — guards against double init (incl. React Strict Mode). */
const initialised = new WeakSet<Element>();

/** How long to wait for AdSense to process a unit before treating it as blocked/failed. */
const LOAD_TIMEOUT_MS = 8000;

interface AdUnitProps {
  client: string;
  slot: string;
  name: string;
  style?: CSSProperties;
}

/**
 * Renders Google's responsive <ins class="adsbygoogle"> and requests an ad once
 * after mount. The box reserves space up front (limits CLS) and collapses when
 * no ad arrives: immediately when AdSense reports "unfilled" (e.g. while the
 * site awaits approval), and — if the script is blocked or fails — once the
 * slot is below the viewport, so that collapse never moves what's being read.
 */
export default function AdUnit({ client, slot, name, style }: AdUnitProps) {
  const boxRef = useRef<HTMLElement>(null);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const ins = insRef.current;
    if (!box || !ins) return;

    let io: IntersectionObserver | undefined;
    // For a blocked/failed script: collapse only once the slot is below the viewport.
    const collapseWhenOffscreen = () => {
      const tryNow = () => {
        if (box.getBoundingClientRect().top < window.innerHeight) return false;
        box.dataset.state = "empty";
        io?.disconnect();
        return true;
      };
      if (!tryNow()) {
        io = new IntersectionObserver(tryNow);
        io.observe(box);
      }
    };

    // AdSense reports the outcome on the <ins>: data-ad-status="filled" | "unfilled".
    // Unfilled units are hidden at once, as Google recommends — AdSense lazy-loads,
    // so this answer normally arrives before the slot scrolls into view.
    const watch = new MutationObserver(() => {
      const status = ins.getAttribute("data-ad-status");
      if (status === "filled") box.dataset.state = "filled";
      if (status === "unfilled") box.dataset.state = "empty";
    });
    watch.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });

    // If the script never processes the unit (blocked, offline, failed), give the space back.
    const timer = window.setTimeout(() => {
      if (!ins.getAttribute("data-adsbygoogle-status")) collapseWhenOffscreen();
    }, LOAD_TIMEOUT_MS);

    if (!initialised.has(ins) && !ins.getAttribute("data-adsbygoogle-status")) {
      initialised.add(ins);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense throws if it can't place the unit; the timeout above collapses it.
      }
    }

    return () => {
      window.clearTimeout(timer);
      watch.disconnect();
      io?.disconnect();
    };
  }, []);

  return (
    <aside ref={boxRef} className="ad-slot" data-ad-unit={name} aria-label="Advertisement" style={style}>
      <span className="ad-slot-label" aria-hidden="true">
        Advertisement
      </span>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
