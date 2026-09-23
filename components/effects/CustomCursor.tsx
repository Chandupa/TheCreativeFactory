"use client";

import { useRef } from "react";
import { useCustomCursor, type CustomCursorOptions } from "@/hooks/useCustomCursor";

// Values from the legacy pages. Defined at module scope so the hook's effect
// is not re-run on every render.
const variants = {
  site: {
    hoverSelector: "a, button",
    idle: { size: "40px", borderColor: "rgba(77, 159, 255, 0.5)" },
    hover: { size: "60px", borderColor: "rgba(77, 159, 255, 0.8)" },
  },
  about: {
    hoverSelector: "a, button, .interactive",
    idle: { size: "40px", borderColor: "rgba(59, 130, 246, 0.5)" },
    hover: {
      size: "60px",
      borderColor: "rgba(59, 130, 246, 0.8)",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
    },
  },
} satisfies Record<string, CustomCursorOptions>;

interface CustomCursorProps {
  /** "site" = home/copyright/contact look, "about" = the About page look. */
  variant?: keyof typeof variants;
}

/** Hidden on touch devices and (for "site") at ≤768px, via CSS. */
export default function CustomCursor({ variant = "site" }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  useCustomCursor(dotRef, outlineRef, variants[variant]);

  return (
    <div className={`custom-cursor custom-cursor--${variant}`} aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </div>
  );
}
