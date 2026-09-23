import type { ComponentType, SVGProps } from "react";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  /** Long values (emails) wrap and use the smaller legacy text size. */
  compact?: boolean;
}

const cards: { title: string; links: ContactLink[] }[] = [
  {
    title: "Get In Touch",
    links: [
      { label: "Phone", value: "+94 713 057 840", href: "tel:+94713057840", Icon: Phone },
      {
        label: "WhatsApp",
        value: "Message on WhatsApp",
        href: "https://wa.me/qr/KTKPT3IISTQ2C1",
        Icon: MessageCircle,
        external: true,
      },
    ],
  },
  {
    title: "Email",
    links: [
      {
        label: "Personal",
        value: "chandupaweerakkody@gmail.com",
        href: "mailto:chandupaweerakkody@gmail.com",
        Icon: Mail,
        compact: true,
      },
      {
        label: "Business",
        value: "chandupa@thecreativefactory.lk",
        href: "mailto:chandupa@thecreativefactory.lk",
        Icon: Mail,
        compact: true,
      },
    ],
  },
];

export default function ContactCards() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDelay: "400ms" }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-gradient-to-br from-blue-950/50 to-purple-950/30 rounded-2xl p-8 border border-blue-400/20 backdrop-blur-xs hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 group"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
              {card.title}
            </span>
            <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </h3>

          <div className="space-y-6">
            {card.links.map(({ label, value, href, Icon, external, compact }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 p-4 rounded-lg bg-blue-900/20 border border-blue-400/20 hover:border-blue-400/50 hover:bg-blue-900/30 transition-all duration-300 interactive group/item"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/20 border border-blue-400/30">
                  <Icon className="w-5 h-5 text-blue-300 group-hover/item:text-blue-200" />
                </div>
                <div className={compact ? "min-w-0" : undefined}>
                  <p className="text-blue-300/70 text-sm font-medium">{label}</p>
                  <p className={compact ? "text-white font-semibold break-all text-sm" : "text-white font-semibold"}>
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
