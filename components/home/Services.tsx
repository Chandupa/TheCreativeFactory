import Link from "next/link";
import type { ServiceSummary } from "@/types/service";
import ServiceCard from "@/components/services/ServiceCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

/**
 * "WHAT WE DO" panel. Cards cascade in as the grid scrolls into view.
 * Services arrive as props (slim summaries) so page copy stays out of the JS bundle.
 */
export default function Services({ services }: { services: ServiceSummary[] }) {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="panel services-panel" data-depth={40}>
        <div className="section-head section-head--center">
          <SectionLabel center>WHAT WE DO</SectionLabel>
          <RevealText className="section-title" id="services-title">
            STORIES, BRANDS &amp; WORLDS <br />
            <span className="accent">BROUGHT TO LIFE</span>
          </RevealText>
        </div>
        <RevealGroup variant="card" className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </RevealGroup>
        <RevealGroup variant="button" className="hero-actions hero-actions--center services-actions">
          <Link href="/services" className="btn btn--outline">
            ALL SERVICES
          </Link>
        </RevealGroup>
      </div>
    </section>
  );
}
