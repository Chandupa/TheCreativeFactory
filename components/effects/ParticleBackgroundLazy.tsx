"use client";

import { useEffect, useState, type ComponentProps } from "react";
import dynamic from "next/dynamic";

// Three.js is the largest dependency on the site. Loading it as its own chunk,
// only after the page is idle, keeps it off the critical path for LCP and
// hydration while the particle field still appears moments after load.
const ParticleBackground = dynamic(() => import("./ParticleBackground"), { ssr: false });

type Props = ComponentProps<typeof ParticleBackground>;

export default function ParticleBackgroundLazy(props: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(start, 1200);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <ParticleBackground {...props} /> : null;
}
