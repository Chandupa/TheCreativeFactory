"use client";

import { useRef } from "react";
import Link from "next/link";
import { stats } from "@/data/site";
import { useGsapContext } from "@/hooks/useGsapContext";
import { whenLoaderDone } from "@/lib/loader";
import { splitWords } from "@/lib/splitWords";
import HeroMedia from "./HeroMedia";
import StatCounter from "./StatCounter";
import TypingText from "./TypingText";

/** `phrases` are the service names for the typing line, passed from the server page. */
export default function Hero({ phrases }: { phrases: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Page-load intro, played as the loading screen lifts (the header slides in
  // first, from <ScrollReveal>): label → title lines → typing line → copy →
  // buttons → stats, while the background settles in underneath. Readable
  // within ~1s; the whole sequence is done in under 2s.
  useGsapContext(sectionRef, (gsap, root) => {
    const k = window.matchMedia("(max-width: 768px)").matches ? 0.55 : 1;
    const title = root.querySelector<HTMLElement>(".hero-title");
    const split = title ? splitWords(title) : null;
    const rise = (y: number) => ({ y: y * k, opacity: 0, duration: 0.9 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "reveal" }, onComplete: () => split?.revert() });
    tl.from(root.querySelector(".hero-media"), { opacity: 0, scale: 1.12, duration: 1.8 }, 0)
      .from(root.querySelector(".hero-kicker"), rise(20), 0.1);
    split?.lines.forEach((line, i) => {
      tl.from(line, { yPercent: 120, opacity: 0, duration: 1.2 }, 0.2 + i * 0.1);
    });
    tl.from(root.querySelector(".hero-typing"), rise(24), 0.5)
      .from(root.querySelector(".hero-copy p"), rise(20), 0.62)
      .from(root.querySelectorAll(".hero-copy .btn"), { ...rise(15), stagger: 0.08 }, 0.72)
      .from(root.querySelectorAll(".hero-stats .stat"), { ...rise(24), stagger: 0.08 }, 0.78);

    const unsubscribe = whenLoaderDone(() => tl.play());
    return () => {
      unsubscribe();
      split?.revert();
    };
  });

  return (
    <section ref={sectionRef} className="hero">
      <HeroMedia />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-inner">
        {/* The H1 says what the studio is; the slogan below stays the dominant visual. */}
        <h1 className="eyebrow hero-kicker">Creative Agency &amp; Production Studio in Sri Lanka</h1>
        <p className="hero-title">
          <span className="hero-line">
            WE SEE THE <span className="accent">UNSEEN</span>
          </span>{" "}
          <span className="hero-line">
            WE TELL THE <span className="accent">UNTOLD</span>
          </span>
        </p>

        <TypingText phrases={phrases} />

        <div className="hero-bottom">
          <div className="hero-stats">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="hero-copy">
            <p>
              The Creative Factory is a Sri Lankan creative studio, established in 2019. We design brands, animate
              ideas, shoot and finish films and photography, build games, and grow brands through SEO and performance
              marketing — taking each project from first concept to final delivery.
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
