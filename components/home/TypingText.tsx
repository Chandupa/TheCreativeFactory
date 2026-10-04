"use client";

import { useTypingAnimation } from "@/hooks/useTypingAnimation";

/** "WE CREATE <typed service>|" accent line under the hero headline. */
export default function TypingText({ phrases }: { phrases: string[] }) {
  const text = useTypingAnimation(phrases);

  return (
    <p className="hero-typing">
      <span className="sr-only">We create {phrases.join(", ")}.</span>
      <span aria-hidden="true">
        WE CREATE <span className="hero-typing-word">{text}</span>
        <span className="cursor">|</span>
      </span>
    </p>
  );
}
