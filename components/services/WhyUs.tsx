import Link from "next/link";
import { clients } from "@/data/clients";
import { founder, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import SectionLabel from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealText } from "@/components/motion/Reveal";

const NUMBER_WORDS: Record<number, string> = {
  3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", 11: "Eleven", 12: "Twelve",
};

// Named clients only (placeholder entries are skipped).
const clientNames = clients.map((client) => client.name).filter((name) => !/^Client \d+$/.test(name));

/**
 * "Why The Creative Factory" — built only from facts already on the site:
 * founding year, the service line-up, the founder and the client roster.
 */
export default function WhyUs() {
  const points = [
    {
      title: `Making work since ${siteConfig.foundingYear}`,
      body: "The studio has been designing, producing and marketing for brands in Sri Lanka since it was founded.",
    },
    {
      title: `${NUMBER_WORDS[services.length] ?? services.length} disciplines, one team`,
      body: "Design, production and marketing under one roof — the team that makes the work can also get it seen, with fewer handovers and one consistent standard.",
    },
    {
      title: "Founder-led",
      body: `Projects are led by founder and lead designer ${founder.name}, so creative decisions stay with the people who shaped the idea.`,
    },
    {
      title: "Trusted by known brands",
      body: `Clients include ${clientNames.slice(0, 6).join(", ")}.`,
    },
  ];

  return (
    <section className="section why-section" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <SectionLabel>WHY THE CREATIVE FACTORY</SectionLabel>
          <RevealText className="section-title" id="why-title">
            ONE STUDIO, <span className="accent">END TO END</span>
          </RevealText>
        </div>
        <RevealGroup as="ul" variant="card" className="detail-grid detail-grid--4">
          {points.map((point) => (
            <li key={point.title} className="detail-card">
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </RevealGroup>
        <Reveal as="p" variant="fade" className="section-link">
          <Link href="/about">More about the studio and its founder →</Link>
        </Reveal>
      </div>
    </section>
  );
}
