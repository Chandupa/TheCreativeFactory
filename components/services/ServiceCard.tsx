import type { Service } from "@/types/service";
import Icon from "@/components/ui/Icon";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon name={service.icon} />
      </div>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-description">{service.description}</p>
    </div>
  );
}
