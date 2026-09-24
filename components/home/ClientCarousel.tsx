"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Client } from "@/types/client";
import { useDraggableMarquee } from "@/hooks/useDraggableMarquee";

interface ClientCarouselProps {
  clients: Client[];
  reverse?: boolean;
}

/**
 * Infinite logo row: auto-scrolls, and can be dragged or swiped. The list is
 * rendered twice so the loop is seamless at any viewport width.
 */
export default function ClientCarousel({ clients, reverse = false }: ClientCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useDraggableMarquee(viewportRef, trackRef, { speed: 50, reverse });

  const loop = [...clients, ...clients];

  return (
    <div ref={viewportRef} className="marquee">
      <div ref={trackRef} className="marquee-track">
        {loop.map((client, index) => (
          <div className="logo-item" key={`${client.id}-${index}`} aria-hidden={index >= clients.length}>
            {client.logo ? (
              // Eager: tiles slide into view via transform, so lazy loading would make them pop in.
              <Image
                src={client.logo}
                alt={client.alt}
                width={540}
                height={240}
                sizes="200px"
                loading="eager"
                draggable={false}
              />
            ) : (
              // Placeholder for clients without a logo file yet (see data/clients.ts).
              <span className="logo-placeholder">{client.alt}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
