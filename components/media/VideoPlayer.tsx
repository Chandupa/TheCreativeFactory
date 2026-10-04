"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectVideo } from "@/types/project";

/**
 * Click-to-play video. Until the visitor presses play, only the (optimised)
 * poster image loads — no player JS, iframe or video bytes — so portfolio
 * videos never compete with the page's LCP.
 */
export default function VideoPlayer({ video }: { video: ProjectVideo }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    if (video.youtubeId) {
      return (
        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      );
    }
    if (video.vimeoId) {
      return (
        <div className="video-frame">
          <iframe
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if (video.src) {
      return (
        <div className="video-frame">
          <video src={video.src} poster={video.poster.src} controls autoPlay playsInline />
        </div>
      );
    }
  }

  return (
    <div className="video-frame">
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        width={video.poster.width}
        height={video.poster.height}
        sizes="(min-width: 1400px) 1400px, 100vw"
      />
      <button type="button" className="video-play" onClick={() => setPlaying(true)}>
        <span className="video-play-icon" aria-hidden="true" />
        <span className="sr-only">Play video: {video.title}</span>
      </button>
    </div>
  );
}
