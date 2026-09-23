"use client";

import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const PHRASES = [
  "WE SEE THE UNSEEN.",
  "WE TELL THE UNTOLD.",
  "WE SEE THE UNSEEN, WE TELL THE UNTOLD.",
] as const;

/** Isolated so only this node re-renders on each typed character. */
export default function TypingText() {
  const text = useTypingAnimation(PHRASES);

  return (
    <h1 className="typing-container" aria-label={PHRASES[PHRASES.length - 1]}>
      <span aria-hidden="true">{text}</span>
      <span className="cursor" aria-hidden="true">
        |
      </span>
    </h1>
  );
}
