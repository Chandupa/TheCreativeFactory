import Link from "next/link";
import type { Service } from "@/types/service";
import Icon from "@/components/ui/Icon";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

interface RelatedServicesProps {
  services: Service[];
  label?: string;
  title?: string;
}

/** Cross-links between service pages, with each service's summary as context. */
export default function RelatedServices({
  services,
  label = "RELATED SERVICES",
  title = "Works well with",
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="section related-section" aria-labelledby="related-services-title">
      <div className="container">
        <div className="section-head">
          <SectionLabel>{label}</SectionLabel>
          <RevealText className="section-title" id="related-services-title">
            {title}
          </RevealText>
        </div>
        <RevealGroup as="ul" variant="card" className="related-grid">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="related-card">
                <span className="service-icon">
                  <Icon name={service.icon} />
                </span>
                <span className="related-card-name">{service.name}</span>
                <span className="related-card-text">{service.summary}</span>
              </Link>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
