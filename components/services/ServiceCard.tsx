import Link from "next/link";
import type { ServiceSummary } from "@/types/service";
import Icon from "@/components/ui/Icon";

export default function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    // Outer wrapper is what the reveal animates, so the card's own hover transform isn't overridden.
    <div className="service-reveal">
      <Link href={`/services/${service.slug}`} className="service-card">
        <span className="service-icon">
          <Icon name={service.icon} />
        </span>
        <h3 className="service-name">{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <span className="service-more">
          Explore {service.name.toLowerCase()} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
