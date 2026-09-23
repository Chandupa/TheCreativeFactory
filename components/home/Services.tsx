"use client";

import { useRef } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import { useGsapContext } from "@/hooks/useGsapContext";

/** "WHAT WE DO" section. Each card scrubs in (y: 40, fade) as it scrolls into view. */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (gsap, root) => {
    root.querySelectorAll<HTMLElement>(".service-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", end: "+=50%", scrub: 0.5 },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
      });
    });
  });

  return (
    <section ref={sectionRef} className="services-section">
      <div
        className="services-bg-circle"
        style={{
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(77, 159, 255, 0.1) 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="services-bg-circle"
        style={{
          bottom: -50,
          right: -80,
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(77, 159, 255, 0.08) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      <div className="services-content">
        <h2 className="services-title">WHAT WE DO</h2>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
