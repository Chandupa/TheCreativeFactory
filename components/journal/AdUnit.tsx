"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AdPlacement } from "@/lib/journal/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** One AdSense unit. Requests an ad once per mount (and per page on client-side navigation). */
export default function AdUnit({ client, slot, placement }: { client: string; slot: string; placement: AdPlacement }) {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins || ins.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or a failed script load: the reserved space simply stays empty.
    }
  }, [pathname]);

  return (
    <aside className={`ad-slot ad-slot--${placement}`} aria-label="Advertisement">
      <span className="ad-slot-label">Advertisement</span>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={placement === "sidebar" ? "vertical" : "auto"}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
