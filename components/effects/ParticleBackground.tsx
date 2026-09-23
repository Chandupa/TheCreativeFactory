"use client";

import { useRef } from "react";
import { useParticles, type ParticleOptions } from "@/hooks/useParticles";

type ParticleBackgroundProps = Omit<ParticleOptions, "canvasClassName">;

/**
 * Fixed full-screen Three.js particle field behind the page (z-index -2).
 * The wrapper is a plain block so it does not create a stacking context.
 */
export default function ParticleBackground(props: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useParticles(containerRef, { ...props, canvasClassName: "three-canvas" });
  return <div ref={containerRef} aria-hidden="true" />;
}
