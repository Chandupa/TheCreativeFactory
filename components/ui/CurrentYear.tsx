"use client";

/** Replaces the legacy `document.write(new Date().getFullYear())`. */
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
