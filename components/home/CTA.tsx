"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
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
        scrollTrigger: { trigger: heading, start: "top 80%", end: "+=50%", scrub: 0.5 },
      })
      .from(split.chars ?? [], { y: 30, opacity: 0, stagger: 0.05, duration: 0.8 }, 0);

    // Restore the original markup React rendered.
    return () => split.revert();
  });

  return (
    <section ref={sectionRef} className="new-sound">
      <div className="new-sound-circle new-sound-circle--a" />
      <div className="new-sound-circle new-sound-circle--b" />

      <div className="new-sound-inner">
        <h2>
          READY TO BUILD YOUR BRAND?
          <br />
          <span>JOIN US TODAY</span>
        </h2>
        <Link href="/contact" className="cta-button">
          JOIN US TODAY
        </Link>
      </div>
    </section>
  );
}
