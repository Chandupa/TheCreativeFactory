"use client";

import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";

/*
 * Wordmark geometry in viewBox units. FONT_SIZE is picked so Days One's natural
 * advance for "THECREATIVEFACTORY" (with the logo's -0.02em tracking) is ~WIDTH;
 * textLength then pins it to exactly WIDTH by nudging letter spacing only, so
 * glyphs are never stretched and the box is identical before/after the font loads.
 */
const WIDTH = 1000;
const FONT_SIZE = 75; // 13.64em natural advance, ~13.28em with tracking
const CAP_HEIGHT = 52.5; // Days One cap height is 0.70em
const PAD = 2; // room for round-letter overshoot

/**
 * Oversized "THE CREATIVE FACTORY" wordmark that opens the footer — the same
 * text wordmark as <Logo />, blown up to span the viewport. Scales/fades up
 * as it scrolls into view (skipped under prefers-reduced-motion).
 */
export default function FooterBrandMark() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsapContext(rootRef, (gsap, root) => {
    gsap.fromTo(
      root.querySelector(".brandmark-svg"),
      { scale: 0.94, opacity: 0.35, yPercent: 12 },
      {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom 85%", scrub: 0.6 },
      },
    );
  });

  return (
    <div ref={rootRef} className="brandmark" aria-hidden="true">
      <svg
        className="brandmark-svg"
        viewBox={`0 ${-PAD} ${WIDTH} ${CAP_HEIGHT + PAD * 2}`}
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <text
          x="0"
          y={CAP_HEIGHT}
          fontSize={FONT_SIZE}
          textLength={WIDTH}
          lengthAdjust="spacing"
        >
          THE<tspan className="brandmark-accent">CREATIVE</tspan>FACTORY
        </text>
      </svg>
    </div>
  );
}
