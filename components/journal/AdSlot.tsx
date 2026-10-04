import type { CSSProperties } from "react";
import { ADS_ENABLED, ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC, adUnitForSlot } from "@/lib/journal/ads";
import AdUnit from "./AdUnit";

/**
 * One manual AdSense unit, e.g. <AdSlot slot={ARTICLE_TOP_SLOT} />.
 * Renders nothing for unregistered slot ids or when ADS_ENABLED is false.
 *
 * The adsbygoogle.js <script async> is rendered alongside every unit, but React
 * hoists async scripts into <head> and de-duplicates them by src — so the page
 * gets exactly one copy, and only pages that show an ad load it at all.
 */
export default function AdSlot({ slot }: { slot: string }) {
  if (!ADS_ENABLED) return null;
  const unit = adUnitForSlot(slot);
  if (!unit) return null;

  return (
    <>
      <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />
      <AdUnit
        client={ADSENSE_CLIENT}
        slot={unit.slot}
        name={unit.name}
        style={{ "--ad-reserve-mobile": `${unit.reserve.mobile}px`, "--ad-reserve-desktop": `${unit.reserve.desktop}px` } as CSSProperties}
      />
    </>
  );
}
