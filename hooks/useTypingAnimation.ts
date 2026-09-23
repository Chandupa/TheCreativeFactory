"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

export interface TypingAnimationOptions {
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a fully typed phrase */
  pause?: number;
  /** ms to hold the last phrase before the loop restarts */
  finalPause?: number;
}

/**
 * Type → hold → delete → next phrase, looping forever.
 *
 * Timings match the legacy site (100ms type, 50ms delete, 2s hold, 4s hold on
 * the last phrase). The legacy version scheduled a second setTimeout to flip
 * its `isDeleting` flag alongside the main loop timer; after the last phrase
 * that race made it "delete" phrase 1 from the wrong length and skip retyping
 * it. Here a single timer drives the whole state machine, and it is cleared on
 * unmount.
 */
export function useTypingAnimation(
  phrases: readonly string[],
  { typeSpeed = 100, deleteSpeed = 50, pause = 2000, finalPause = 4000 }: TypingAnimationOptions = {},
): string {
  const [text, setText] = useState("");

  useEffect(() => {
    if (phrases.length === 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (prefersReducedMotion()) {
      timer = setTimeout(() => setText(phrases[phrases.length - 1]), 0);
      return () => clearTimeout(timer);
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));

        if (charIndex >= phrase.length) {
          deleting = true;
          timer = setTimeout(tick, phraseIndex === phrases.length - 1 ? finalPause : pause);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
        return;
      }

      charIndex -= 1;
      setText(phrase.slice(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      timer = setTimeout(tick, deleteSpeed);
    };

    timer = setTimeout(tick, 0);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phrases, typeSpeed, deleteSpeed, pause, finalPause]);

  return text;
}
