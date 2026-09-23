"use client";

import { useEffect, type RefObject } from "react";
import { isCoarsePointer } from "@/lib/utils";

export interface CursorHoverStyle {
  size: string;
  borderColor: string;
  boxShadow?: string;
}

export interface CustomCursorOptions {
  /** Elements that trigger the enlarged outline. */
  hoverSelector: string;
  idle: CursorHoverStyle;
  hover: CursorHoverStyle;
}

/**
 * Moves the dot/outline with direct style writes (no React state, so no
 * re-render per mousemove). Hover detection uses event delegation, so links
 * rendered after mount — or on a new route — work without re-binding.
 */
export function useCustomCursor(
  dotRef: RefObject<HTMLDivElement | null>,
  outlineRef: RefObject<HTMLDivElement | null>,
  { hoverSelector, idle, hover }: CustomCursorOptions,
): void {
  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline || isCoarsePointer()) return;

    const apply = (style: CursorHoverStyle) => {
      outline.style.width = style.size;
      outline.style.height = style.size;
      outline.style.borderColor = style.borderColor;
      outline.style.boxShadow = style.boxShadow ?? "none";
    };

    let hovering = false;

    const onMove = (e: MouseEvent) => {
      const position = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = position;
      outline.style.transform = position;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest(hoverSelector) : null;
      if (Boolean(target) === hovering) return;
      hovering = Boolean(target);
      apply(hovering ? hover : idle);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [dotRef, outlineRef, hoverSelector, idle, hover]);
}
