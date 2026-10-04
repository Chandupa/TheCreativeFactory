"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroMedia } from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

/** Skip the background video for reduced motion and data-saver visitors. */
function shouldPlayVideo(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !prefersReducedMotion() && !connection?.saveData;
}

/**
 * Hero background. The optimised poster image always renders first (it is the
 * LCP candidate); when `heroMedia.video` is set in data/site.ts, the video is
 * mounted only once the page has loaded and gone idle, then fades in over the
 * poster — so a showreel never delays first paint.
 */
export default function HeroMedia() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!heroMedia.video || !shouldPlayVideo()) return;

    let idleId: number | undefined;
    const mount = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(() => setShowVideo(true));
      else setShowVideo(true);
    };

    if (document.readyState === "complete") mount();
    else window.addEventListener("load", mount, { once: true });

    return () => {
      window.removeEventListener("load", mount);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
  }, []);

  return (
    // Parallax drift is picked up by <ScrollReveal>.
    <div className="hero-media" aria-hidden="true" data-parallax={80}>
      <Image src={heroMedia.poster} alt="" fill sizes="100vw" preload quality={75} style={{ objectFit: "cover" }} />
      {showVideo && heroMedia.video ? (
        <video
          className={videoReady ? "hero-video is-ready" : "hero-video"}
          src={heroMedia.video}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
        />
      ) : null}
      {!heroMedia.video && process.env.NODE_ENV === "development" ? (
        <span className="hero-media-placeholder">BG VIDEO PLACEHOLDER — set heroMedia.video in data/site.ts</span>
      ) : null}
    </div>
  );
}
