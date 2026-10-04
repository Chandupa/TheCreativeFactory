"use client";

import { useSyncExternalStore } from "react";

/**
 * <time> that reads "18 min ago" / "2 hours ago" for stories under a day old,
 * refreshing each minute. The server (and first client render) shows the
 * absolute label, so the HTML is cache-safe and hydration matches; the
 * machine-readable ISO date is always in `dateTime`.
 */

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, MINUTE);
  return () => clearInterval(id);
}

// Rounded to the minute so the snapshot is stable between ticks.
const getNow = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const getServerNow = () => null;

function relative(iso: string, now: number): string | null {
  const diff = now - new Date(iso).getTime();
  if (diff < 0 || diff >= 24 * 60 * MINUTE) return null;
  const minutes = Math.floor(diff / MINUTE);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
}

export default function TimeAgo({ iso, fallback, className }: { iso: string; fallback: string; className?: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  return (
    <time dateTime={iso} className={className}>
      {(now !== null && relative(iso, now)) || fallback}
    </time>
  );
}
