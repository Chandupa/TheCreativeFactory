/*
 * Advertising config for TCF Journal (Google AdSense). Ads are Journal-only:
 * the AdSense script is loaded by app/(site)/journal/layout.tsx and units
 * render only where <AdSlot> is placed inside Journal pages.
 *
 * Nothing renders until NEXT_PUBLIC_ADSENSE_CLIENT ("ca-pub-…") and the slot
 * id for a placement are set. Use manual ad units only — turn Auto ads OFF in
 * AdSense, or Google may inject ads into the agency pages.
 */

export type AdPlacement = "article-top" | "in-article" | "article-end" | "sidebar" | "listing";

export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || null;

const slotIds: Record<AdPlacement, string | undefined> = {
  "article-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP,
  "in-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  "article-end": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  listing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LISTING,
};

/** The AdSense slot id for a placement, or null if ads aren't configured for it. */
export function adSlotId(placement: AdPlacement): string | null {
  return adsenseClient ? slotIds[placement]?.trim() || null : null;
}

export const adsEnabled = Boolean(adsenseClient && Object.values(slotIds).some((id) => id?.trim()));
