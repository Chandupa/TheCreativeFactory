"use client";

import { services } from "@/data/services";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const PHRASES = services.map((service) => service.name.toUpperCase());

/** "WE CREATE <typed service>|" accent line under the hero headline. */
export default function TypingText() {
  const text = useTypingAnimation(PHRASES);

  return (
    <p className="hero-typing">
      <span className="sr-only">We create {PHRASES.join(", ")}.</span>
      <span aria-hidden="true">
        WE CREATE <span className="hero-typing-word">{text}</span>
        <span className="cursor">|</span>
      </span>
    </p>
  );
}
