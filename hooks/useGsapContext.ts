"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type Setup<T extends HTMLElement> = (g: typeof gsap, root: T, st: typeof ScrollTrigger) => void | (() => void);

/**
 * Runs GSAP setup inside a gsap.context() scoped to `scopeRef`, and reverts
 * every tween/ScrollTrigger it created on unmount. Skipped under
 * prefers-reduced-motion, leaving content in its final, visible state.
 */
export function useGsapContext<T extends HTMLElement>(scopeRef: RefObject<T | null>, setup: Setup<T>): void {
  const setupRef = useRef(setup);

  useLayoutEffect(() => {
    setupRef.current = setup;
  });

  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root || prefersReducedMotion()) return;

    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setupRef.current(gsap, root, ScrollTrigger);
    }, root);

    return () => {
      ctx.revert();
      if (typeof cleanup === "function") cleanup();
    };
  }, [scopeRef]);
}
