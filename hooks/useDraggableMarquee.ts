"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/utils";

export interface DraggableMarqueeOptions {
  /** Auto-scroll speed in px/s. */
  speed?: number;
  /** Scroll right instead of left. */
  reverse?: boolean;
}

/** Fraction of fling velocity left after one second. */
const INERTIA_DECAY = 0.04;
const MAX_FLING = 3000;

/**
 * Infinite marquee that auto-scrolls and can be dragged (mouse, pen, touch) or
 * swiped with a trackpad; a drag leaves some momentum that decays back into
 * the auto-scroll.
 *
 * `track` must contain its items twice (with trailing padding equal to the
 * gap), so half its width is exactly one loop. The position is written
 * straight to `transform` from a rAF loop, so there are no React re-renders.
 */
export function useDraggableMarquee(
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  { speed = 50, reverse = false }: DraggableMarqueeOptions = {},
): void {
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Reduced motion: no auto-scroll, but manual dragging still works.
    const autoVelocity = prefersReducedMotion() ? 0 : speed * (reverse ? 1 : -1);

    let loopWidth = track.scrollWidth / 2;
    let x = 0;
    let inertia = 0;
    let dragging = false;
    let pointerId = -1;
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;
    let visible = true;
    let frame = 0;
    let prev = performance.now();

    // Keep x in [-loopWidth, 0) so the duplicated half always fills the gap.
    const wrap = () => {
      if (loopWidth > 0) x = (((x % loopWidth) + loopWidth) % loopWidth) - loopWidth;
    };
    const render = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!visible && !dragging) return;

      if (!dragging) {
        x += (autoVelocity + inertia) * dt;
        inertia *= Math.pow(INERTIA_DECAY, dt);
        if (Math.abs(inertia) < 1) inertia = 0;
      }
      wrap();
      render();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastTime = e.timeStamp;
      dragVelocity = 0;
      inertia = 0;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("is-dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(e.timeStamp - lastTime, 1);
      x += dx;
      // Smoothed px/s, used for the fling on release.
      dragVelocity = 0.8 * ((dx / dt) * 1000) + 0.2 * dragVelocity;
      lastX = e.clientX;
      lastTime = e.timeStamp;
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      // Holding still before letting go means no fling.
      const idle = e.timeStamp - lastTime > 100;
      inertia = idle ? 0 : Math.max(-MAX_FLING, Math.min(MAX_FLING, dragVelocity));
      viewport.classList.remove("is-dragging");
    };

    // Horizontal trackpad swipes / shift+wheel move the row; vertical scrolling passes through.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      x -= e.deltaX;
      inertia = 0;
    };

    // Stop native image/text dragging from hijacking the gesture.
    const onDragStart = (e: Event) => e.preventDefault();

    const resizeObserver = new ResizeObserver(() => {
      loopWidth = track.scrollWidth / 2;
      wrap();
      render();
    });
    resizeObserver.observe(track);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(viewport);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("dragstart", onDragStart);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("dragstart", onDragStart);
      viewport.classList.remove("is-dragging");
      track.style.transform = "";
    };
  }, [viewportRef, trackRef, speed, reverse]);
}
