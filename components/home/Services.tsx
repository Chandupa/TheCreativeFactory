"use client";

import { useRef } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { useGsapContext } from "@/hooks/useGsapContext";

/** "WHAT WE DO" panel. Cards rise in, staggered, as the grid scrolls into view. */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (gsap, root) => {
    gsap.from(root.querySelectorAll(".service-reveal"), {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: root.querySelector(".services-grid"), start: "top 85%", once: true },
    });
  });

  return (
    <section ref={sectionRef} className="section services-section" id="services">
      <div className="panel services-panel">
        <div className="section-head section-head--center">
          <SectionLabel center>WHAT WE DO</SectionLabel>
          <h2 className="section-title">
            STORIES, BRANDS &amp; WORLDS <br />
            <span className="accent">BROUGHT TO LIFE</span>
          </h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
