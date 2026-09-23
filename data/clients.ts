import type { Client } from "@/types/client";

// Logos live in /public/logos as 540×240 transparent PNGs (white/light
// artwork for the dark tiles). A client without `logo` falls back to a text
// placeholder in the carousel.
export const clients: Client[] = [
  { id: 1, name: "Hayleys", alt: "The World of Hayleys logo", logo: "/logos/1.png" },
  { id: 2, name: "SLIIT", alt: "SLIIT UNI logo", logo: "/logos/2.png" },
  { id: 3, name: "CINEC Campus", alt: "CINEC Campus logo", logo: "/logos/3.png" },
  { id: 4, name: "Whisper", alt: "Whisper logo", logo: "/logos/4.png" },
  // TODO: add the organisation's name — the emblem's name isn't legible from the file.
  { id: 5, name: "Client 5", alt: "Client logo", logo: "/logos/5.png" },
  { id: 6, name: "Pantene", alt: "Pantene logo", logo: "/logos/6.png" },
  { id: 7, name: "Head & Shoulders", alt: "Head & Shoulders logo", logo: "/logos/7.png" },
  { id: 8, name: "Pampers", alt: "Pampers logo", logo: "/logos/8.png" },
  { id: 9, name: "Mister Potato", alt: "Mister Potato logo", logo: "/logos/9.png" },
  { id: 10, name: "Vicks", alt: "Vicks logo", logo: "/logos/10.png" },
];
