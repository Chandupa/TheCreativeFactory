import { clients } from "@/data/clients";
import SectionLabel from "@/components/ui/SectionLabel";
import ClientCarousel from "./ClientCarousel";
import { Parallax, RevealText } from "@/components/motion/Reveal";

// Second row runs the other way, starting mid-list so the rows don't mirror each other.
const half = Math.ceil(clients.length / 2);
const secondRow = [...clients.slice(half), ...clients.slice(0, half)];

export default function Clients() {
  return (
    <section className="section clients-section">
      <Parallax className="clients-glow" distance={70} aria-hidden="true" />
      <div className="container section-head section-head--center">
        <SectionLabel center>OUR CLIENTS</SectionLabel>
        <RevealText className="section-title">
          BRANDS WE&apos;VE <span className="accent">WORKED WITH</span>
        </RevealText>
      </div>
      <ClientCarousel clients={clients} />
      <ClientCarousel clients={secondRow} reverse />
    </section>
  );
}
