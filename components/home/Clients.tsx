import { clients } from "@/data/clients";
import ClientCarousel from "./ClientCarousel";

export default function Clients() {
  return (
    <section className="clients-section">
      <div className="clients-inner">
        <h2 className="clients-title">OUR CLIENTS</h2>
        <ClientCarousel clients={clients} />
      </div>
    </section>
  );
}
