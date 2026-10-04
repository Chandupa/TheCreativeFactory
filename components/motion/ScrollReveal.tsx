"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenLoaderDone } from "@/lib/loader";
import { splitWords, type WordSplit } from "@/lib/splitWords";
import { prefersReducedMotion } from "@/lib/utils";
import type { RevealVariant } from "./Reveal";

interface Target {
  el: HTMLElement;
  variant: RevealVariant;
  delay: number;
}

const EASE = "reveal"; // cubic-bezier(0.16, 1, 0.3, 1), registered in lib/gsap
/** Gap between items that enter together, and the cap so long lists never drag. */
const STAGGER = 0.08;
const MAX_CASCADE = 0.64;

/** Rise distance (desktop px) for the simple variants. */
const RISE: Partial<Record<RevealVariant, number>> = { up: 56, card: 60, project: 60, copy: 20, button: 15, fade: 10 };
const DURATION: Partial<Record<RevealVariant, number>> = { up: 1, card: 1.05, copy: 0.9, button: 0.75, fade: 0.8 };

// The header slides in once per visit, not on every client-side navigation.
let headerIntroPlayed = false;

function collectTargets(root: HTMLElement): Target[] {
  const targets: Target[] = [];
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    targets.push({ el, variant: el.dataset.reveal as RevealVariant, delay: Number(el.dataset.revealDelay) || 0 });
  });
  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const variant = (group.dataset.revealGroup || "up") as RevealVariant;
    const delay = Number(group.dataset.revealDelay) || 0;
    for (const child of Array.from(group.children)) {
      if (child instanceof HTMLElement) targets.push({ el: child, variant, delay });
    }
  });
  // Persistent elements (footer) already revealed on an earlier page stay put.
  return targets.filter((t) => !t.el.hasAttribute("data-revealed"));
}

function byPosition(a: HTMLElement, b: HTMLElement): number {
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  return Math.abs(ra.top - rb.top) > 4 ? ra.top - rb.top : ra.left - rb.left;
}

/**
 * The site-wide scroll reveal + parallax engine. Mounted once in MainLayout;
 * re-scans the page on every route change.
 *
 * Elements opt in with the data-attributes rendered by components/motion/Reveal
 * (`data-reveal`, `data-reveal-group`, `data-parallax`, `data-depth`). Hidden
 * states are applied here, in JS, so markup is visible without JavaScript and
 * under prefers-reduced-motion nothing is hidden or moved at all.
 *
 * Reveals fire once (IntersectionObserver, ~12% before an element is fully in
 * view) and are cleaned up to plain CSS afterwards; parallax/depth scrub
 * continuously via ScrollTrigger (which Lenis already drives).
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>(".site");
    if (!root) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const k = mobile ? 0.55 : 1; // shorter travel on phones
    const splits = new Set<WordSplit>();
    const byElement = new Map<Element, Target>();
    let early: IntersectionObserver | undefined;
    let atEnd: IntersectionObserver | undefined;
    let unsubscribeLoader = () => {};

    const finish = (el: HTMLElement) => {
      el.classList.remove("is-revealing");
      el.setAttribute("data-revealed", "");
    };

    /** Masked line-by-line word rise; resolves the split back to plain DOM when done. */
    const maskedText = (tl: gsap.core.Timeline, el: HTMLElement, at: number, display: boolean) => {
      const split = splitWords(el);
      splits.add(split);
      split.lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { yPercent: display ? 130 : 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: display ? 1.3 : 1.05, ease: EASE },
          at + i * (display ? 0.1 : STAGGER),
        );
      });
      return split;
    };

    const play = ({ el, variant }: Target, delay: number) => {
      el.classList.add("is-revealing");
      const cleanup: Array<() => void> = [];
      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          cleanup.forEach((fn) => fn());
          gsap.set(el, { clearProps: "transform,opacity,clipPath" });
          finish(el);
        },
      });

      switch (variant) {
        case "heading":
        case "display": {
          gsap.set(el, { opacity: 1 });
          const split = maskedText(tl, el, 0, variant === "display");
          cleanup.push(() => {
            split.revert();
            splits.delete(split);
          });
          break;
        }

        case "image": {
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE }, 0);
          const media = el.querySelector<HTMLElement>("img, video");
          if (media) {
            tl.fromTo(
              media,
              { scale: 1.08, y: 30 * k, opacity: 0.5 },
              { scale: 1, y: 0, opacity: 1, duration: 1.6, ease: EASE },
              0,
            );
            cleanup.push(() => gsap.set(media, { clearProps: "transform,opacity" }));
          }
          break;
        }

        case "project": {
          tl.to(el, { y: 0, opacity: 1, duration: 1.1, ease: EASE }, 0);
          const media = el.querySelector<HTMLElement>(".project-card-media img");
          if (media) {
            tl.fromTo(media, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: EASE }, 0);
            cleanup.push(() => gsap.set(media, { clearProps: "transform" }));
          }
          const title = el.querySelector<HTMLElement>(".project-card-title");
          if (title) {
            const split = maskedText(tl, title, 0.15, false);
            cleanup.push(() => {
              split.revert();
              splits.delete(split);
            });
          }
          const meta = el.querySelectorAll<HTMLElement>(".project-card-meta, .project-card-summary, .project-card-tags");
          if (meta.length) {
            tl.fromTo(meta, { y: 12 * k, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.06 }, 0.3);
            cleanup.push(() => gsap.set(meta, { clearProps: "transform,opacity" }));
          }
          break;
        }

        default:
          tl.to(el, { y: 0, opacity: 1, duration: DURATION[variant] ?? 1, ease: EASE });
      }
    };

    const ctx = gsap.context(() => {
      const viewportH = window.innerHeight;

      // ---- Header: slides in once, as the loader lifts ----
      if (!headerIntroPlayed) {
        headerIntroPlayed = true;
        const headerItems = root.querySelectorAll<HTMLElement>(".site-header > *");
        gsap.set(headerItems, { opacity: 0, y: -18 });
        unsubscribeLoader = whenLoaderDone(() =>
          ctx.add(() =>
            gsap.to(headerItems, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: EASE,
              stagger: STAGGER,
              clearProps: "transform,opacity",
            }),
          ),
        );
      }

      // ---- One-shot reveals ----
      for (const target of collectTargets(root)) {
        const { el, variant } = target;
        // Already scrolled past (e.g. back/forward with restored scroll): leave visible.
        if (el.getBoundingClientRect().bottom < 0) {
          el.setAttribute("data-revealed", "");
          continue;
        }
        if (variant === "heading" || variant === "display") gsap.set(el, { opacity: 0 });
        else if (variant === "image") gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        else gsap.set(el, { opacity: 0, y: (RISE[variant] ?? 56) * k });
        byElement.set(el, target);
      }

      // ---- Continuous parallax on decorative media ----
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const travel = (Number(el.dataset.parallax) || 60) * (mobile ? 0.5 : 1);
        gsap.fromTo(
          el,
          { y: -travel / 2 },
          {
            y: travel / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section, header, footer") ?? el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // ---- Section depth: panels ease upward a touch as they leave (desktop) ----
      if (!mobile) {
        root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          gsap.to(el, {
            y: -(Number(el.dataset.depth) || 40),
            ease: "none",
            scrollTrigger: { trigger: el, start: `bottom ${viewportH * 0.9}px`, end: "bottom top", scrub: true },
          });
        });
      }
    }, root);

    // Start watching once the loader is lifting, so on-screen reveals are seen.
    const startObserving = () => {
      if (!("IntersectionObserver" in window)) {
        byElement.forEach((target) => ctx.add(() => play(target, 0)));
        return;
      }
      const onIntersect: IntersectionObserverCallback = (entries, io) => {
        const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        entering.sort(byPosition).forEach((el, i) => {
          io.unobserve(el);
          const target = byElement.get(el);
          if (!target) return;
          byElement.delete(el);
          ctx.add(() => play(target, target.delay + Math.min(i * STAGGER, MAX_CASCADE)));
        });
      };
      // Reveal a little before elements are fully in view — except at the very
      // end of the page, which can never scroll up past that line.
      early = new IntersectionObserver(onIntersect, { rootMargin: "0px 0px -12% 0px" });
      atEnd = new IntersectionObserver(onIntersect);
      const endLine = document.documentElement.scrollHeight - window.innerHeight * 0.15;
      byElement.forEach((_, el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        (top > endLine ? atEnd : early)?.observe(el);
      });
    };
    const unsubscribeObserve = whenLoaderDone(startObserving);
    ScrollTrigger.refresh();

    return () => {
      unsubscribeLoader();
      unsubscribeObserve();
      early?.disconnect();
      atEnd?.disconnect();
      splits.forEach((split) => split.revert());
      root.querySelectorAll(".is-revealing").forEach((el) => el.classList.remove("is-revealing"));
      // Reverts every hidden state, tween and ScrollTrigger above: content left as rendered.
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
