import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
}

const links: ContactLink[] = [
  { label: "Phone", value: "+94 713 057 840", href: "tel:+94713057840", Icon: Phone },
  {
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: "https://wa.me/qr/KTKPT3IISTQ2C1",
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "Personal Email",
    value: "chandupaweerakkody@gmail.com",
    href: "mailto:chandupaweerakkody@gmail.com",
    Icon: Mail,
  },
  {
    label: "Business Email",
    value: "chandupa@thecreativefactory.lk",
    href: "mailto:chandupa@thecreativefactory.lk",
    Icon: Mail,
  },
];

export default function ContactCards() {
  return (
    <section className="section contact-cards-section">
      <div className="container">
        <div className="section-head">
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <h2 className="section-title">
            LET&apos;S <span className="accent">TALK</span>
          </h2>
        </div>

        <div className="contact-cards">
          {links.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              className="contact-card"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact-card-icon">
                <Icon width={22} height={22} />
              </span>
              <span className="contact-card-text">
                <span className="contact-card-label">{label}</span>
                <span className="contact-card-value">{value}</span>
              </span>
              <ArrowUpRight className="contact-card-arrow" width={22} height={22} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
