"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import SectionLabel from "@/components/ui/SectionLabel";
import { useGsapContext } from "@/hooks/useGsapContext";

/** "READY TO BUILD YOUR BRAND?" — heading characters scrub in via SplitType. */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (gsap, root) => {
    const heading = root.querySelector<HTMLElement>("h2");
    if (!heading) return;

    const split = new SplitType(heading, { types: "words,chars" });

    gsap
      .timeline({
        scrollTrigger: { trigger: heading, start: "top 85%", end: "+=40%", scrub: 0.5 },
      })
      .from(split.chars ?? [], { y: 30, opacity: 0, stagger: 0.03, duration: 0.8 }, 0);

    return () => split.revert();
  });

  return (
    <section ref={sectionRef} className="section cta-section">
      <div className="panel cta-panel">
        <div className="cta-glow cta-glow--a" aria-hidden="true" />
        <div className="cta-glow cta-glow--b" aria-hidden="true" />
        <SectionLabel center>LET&apos;S WORK TOGETHER</SectionLabel>
        <h2>
          READY TO BUILD YOUR BRAND?
          <br />
          <span className="accent">JOIN US TODAY</span>
        </h2>
        <div className="hero-actions hero-actions--center">
          <Link href="/contact" className="btn btn--primary">
            JOIN US TODAY
          </Link>
          <Link href="/work" className="btn btn--outline">
            SEE OUR WORK
          </Link>
        </div>
      </div>
    </section>
  );
}
