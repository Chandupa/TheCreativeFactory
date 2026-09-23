import Image from "next/image";
import type { Client } from "@/types/client";

/**
 * Infinite CSS marquee. The list is rendered twice and the track moves by
 * exactly one copy (-50%), so the loop is seamless at any viewport width.
 */
export default function ClientCarousel({ clients }: { clients: Client[] }) {
  const loop = [...clients, ...clients];

  return (
    <div className="logo-carousel-viewport">
      <div className="logo-carousel">
        {loop.map((client, index) => (
          <div className="logo-item" key={`${client.id}-${index}`} aria-hidden={index >= clients.length}>
            {client.logo ? (
              // Eager: tiles slide into view via transform, so lazy loading would make them pop in.
              <Image src={client.logo} alt={client.alt} width={540} height={240} sizes="200px" loading="eager" />
            ) : (
              // Documented placeholder: no real logo asset exists yet (see data/clients.ts).
              <span className="logo-placeholder">{client.alt}</span>
            )}
          </div>
        ))}
      </div>

      <div className="logo-carousel-fade logo-carousel-fade--left" />
      <div className="logo-carousel-fade logo-carousel-fade--right" />
    </div>
  );
}
