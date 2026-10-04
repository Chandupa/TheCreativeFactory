import { adSlotId, adsenseClient, type AdPlacement } from "@/lib/journal/ads";
import AdUnit from "./AdUnit";

/**
 * A Journal ad position. Renders nothing at all unless AdSense is configured
 * for this placement (see lib/journal/ads.ts), so there are never empty boxes.
 * When configured, the slot reserves its height up front (CSS per placement)
 * so a late-loading ad can't shift the page.
 */
export default function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = adSlotId(placement);
  if (!slot || !adsenseClient) return null;
  return <AdUnit client={adsenseClient} slot={slot} placement={placement} />;
}
