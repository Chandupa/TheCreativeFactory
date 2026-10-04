"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

let lenisInstance: Lenis | null = null;

/** The active Lenis instance (null under reduced motion or before mount). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger scrubs stay
 * in sync. Skipped entirely when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  // The Journal CMS has its own scroll containers; leave native scrolling alone there.
  const isAdmin = pathname.startsWith("/keystatic");

  useEffect(() => {
    if (prefersReducedMotion() || isAdmin) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [isAdmin]);

  // New route: start at the top and let ScrollTrigger re-measure.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
