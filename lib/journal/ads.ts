/*
 * Google AdSense — the single source of truth for TCF Journal advertising.
 *
 * - Manual ad units only. Auto ads are OFF in the AdSense account and must stay
 *   off; nothing here enables them.
 * - Ads appear only on individual Journal article pages, injected between body
 *   blocks by components/journal/ArticleBody.tsx (never stored in CMS content).
 * - The adsbygoogle.js script is rendered by <AdUnit> and de-duplicated by
 *   React, so it loads once, and only on pages that actually show an ad.
 *
 * To add a unit later (e.g. ARTICLE_BOTTOM_SLOT, SIDEBAR_SLOT, MOBILE_SLOT):
 * create it in AdSense, add its id to AD_UNITS below, then place
 * <AdSlot slot={AD_UNITS.yourUnit.slot} /> where it belongs.
 */

/** Master switch: false removes every ad (and the AdSense script) site-wide. */
export const ADS_ENABLED = true;

export const ADSENSE_CLIENT = "ca-pub-6750982414798216";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export interface AdUnitConfig {
  /** AdSense data-ad-slot. */
  slot: string;
  /** Name as it appears in AdSense. */
  name: string;
  /** Space reserved before the ad loads, to limit layout shift (px). */
  reserve: { mobile: number; desktop: number };
}

export const AD_UNITS = {
  articleTop: { slot: "6272130344", name: "TCF Article Top", reserve: { mobile: 280, desktop: 280 } },
  articleSquare: { slot: "1583919602", name: "TCF Article Square", reserve: { mobile: 300, desktop: 300 } },
} as const satisfies Record<string, AdUnitConfig>;

export const ARTICLE_TOP_SLOT = AD_UNITS.articleTop.slot;
export const ARTICLE_SQUARE_SLOT = AD_UNITS.articleSquare.slot;

/** Config for a slot id, or undefined if it isn't a registered unit. */
export function adUnitForSlot(slot: string): AdUnitConfig | undefined {
  return Object.values(AD_UNITS).find((unit) => unit.slot === slot);
}

/*
 * In-article placement rules (word counts are of the article body):
 *  - Article Top: after the introduction — at least 3 paragraphs and
 *    TOP_MIN_WORDS_BEFORE words in (or a shorter intro ending at a section
 *    heading) — with enough article left after it.
 *  - Article Square: only in articles of SQUARE_MIN_ARTICLE_WORDS or more,
 *    near the middle (preferring a section break), well clear of the first
 *    ad and of the end.
 *  - Ads only go between top-level blocks, never directly after a heading or
 *    a lead-in line ending in ":" (so a heading/lead-in is never separated
 *    from the content it introduces).
 */
export const AD_PLACEMENT = {
  TOP_MIN_PARAGRAPHS_BEFORE: 3,
  TOP_MIN_WORDS_BEFORE: 120,
  /** A shorter intro still qualifies when it ends at a section heading. */
  TOP_SECTION_BREAK_MIN_WORDS: 80,
  TOP_MIN_WORDS_AFTER: 80,
  SQUARE_MIN_ARTICLE_WORDS: 900,
  SQUARE_TARGET_FRACTION: 0.55,
  /** A section break within ~15% of the article (in words) of the target wins over a mid-section gap. */
  SQUARE_SECTION_BREAK_BONUS: 0.15,
  SQUARE_MIN_WORDS_AFTER_TOP: 300,
  SQUARE_MIN_WORDS_AFTER: 200,
} as const;
