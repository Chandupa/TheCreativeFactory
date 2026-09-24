import type { Service } from "@/types/service";
import Icon from "@/components/ui/Icon";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    // Outer wrapper is what GSAP animates, so the card's own hover transform isn't overridden.
    <div className="service-reveal">
      <div className="service-card">
        <div className="service-icon">
          <Icon name={service.icon} />
        </div>
        <h3 className="service-name">{service.name}</h3>
        <p className="service-description">{service.description}</p>
      </div>
    </div>
  );
}
