/*
 * GA4 custom events through the site's existing Google Analytics tag
 * (<GoogleAnalytics> in app/layout.tsx defines window.gtag). A silent no-op
 * when GA isn't loaded — development, ad blockers, or no NEXT_PUBLIC_GA_ID.
 *
 * Journal events (register the params as custom dimensions in GA4 to report on them):
 *   article_view  { article_slug, article_category, article_author, article_type }
 *   share         { method, content_type: "article", item_id }
 *   cta_click     { cta, destination, article_slug }
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
