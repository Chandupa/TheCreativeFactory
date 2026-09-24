"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { heroMedia } from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Background video slot for the hero. Until `heroMedia.video` is set in
 * data/site.ts this renders the poster image as a placeholder (plus a
 * dev-only label so it's obvious the slot is empty).
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect reduced motion: hold on the poster frame instead of looping video.
    if (prefersReducedMotion()) videoRef.current?.pause();
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      {heroMedia.video ? (
        <video
          ref={videoRef}
          src={heroMedia.video}
          poster={heroMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <>
          <Image src={heroMedia.poster} alt="" fill sizes="100vw" preload quality={70} style={{ objectFit: "cover" }} />
          {process.env.NODE_ENV === "development" ? (
            <span className="hero-media-placeholder">BG VIDEO PLACEHOLDER — set heroMedia.video in data/site.ts</span>
          ) : null}
        </>
      )}
    </div>
  );
}
