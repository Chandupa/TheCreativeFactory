"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { stats } from "@/data/site";
import { useGsapContext } from "@/hooks/useGsapContext";
import HeroMedia from "./HeroMedia";
import StatCounter from "./StatCounter";
import TypingText from "./TypingText";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (gsap, root) => {
    const lines = root.querySelectorAll<HTMLElement>(".hero-line");
    const split = new SplitType(Array.from(lines), { types: "words" });

    // On a first visit the loading screen covers the hero for ~2s; wait for it.
    const delay = document.querySelector(".loading-screen") ? 1.7 : 0.2;

    gsap
      .timeline({ delay })
      .from(split.words ?? [], { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.08 })
      .from(
        root.querySelectorAll(".hero-reveal"),
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
        "-=0.5",
      );

    return () => split.revert();
  });

  return (
    <section ref={sectionRef} className="hero">
      <HeroMedia />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-inner">
        <h1 className="hero-title">
          <span className="hero-line">
            WE SEE THE <span className="accent">UNSEEN</span>
          </span>
          <span className="hero-line">
            WE TELL THE <span className="accent">UNTOLD</span>
          </span>
        </h1>

        <div className="hero-reveal">
          <TypingText />
        </div>

        <div className="hero-bottom">
          <div className="hero-stats hero-reveal">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="hero-copy hero-reveal">
            <p>
              At The Creative Factory, we believe in the transformative power of storytelling and innovation. We
              specialize in crafting compelling narratives and providing cutting-edge solutions to help you stand out.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn--primary">
                GET IN TOUCH
              </Link>
              <Link href="/services" className="btn btn--outline">
                OUR SERVICES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
