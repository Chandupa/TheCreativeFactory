"use client";

import { useRef } from "react";
import type { Stat } from "@/data/site";
import { useGsapContext } from "@/hooks/useGsapContext";

/** Stat with a count-up on first scroll into view. SSR renders the final value. */
export default function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(ref, (gsap, root) => {
    if (!stat.countUp) return;
    const value = root.querySelector<HTMLElement>(".stat-number");
    if (!value) return;
    gsap.from(value, {
      textContent: 0,
      snap: { textContent: 1 },
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: root, start: "top 90%", once: true },
    });
  });

  return (
    <div ref={ref} className="stat">
      <div className="stat-value">
        <span className="stat-number">{stat.value}</span>
        {stat.suffix ? <span className="accent"> {stat.suffix}</span> : null}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}
