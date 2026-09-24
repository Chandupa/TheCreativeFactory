"use client";

import { useRef } from "react";
import { useCustomCursor, type CustomCursorOptions } from "@/hooks/useCustomCursor";

// Defined at module scope so the hook's effect is not re-run on every render.
const variants = {
  site: {
    hoverSelector: "a, button",
    idle: { size: "40px", borderColor: "rgba(203, 254, 28, 0.5)" },
    hover: { size: "60px", borderColor: "rgba(203, 254, 28, 0.9)" },
  },
} satisfies Record<string, CustomCursorOptions>;

interface CustomCursorProps {
  variant?: keyof typeof variants;
}

/** Hidden on touch devices and at ≤768px, via CSS. */
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
