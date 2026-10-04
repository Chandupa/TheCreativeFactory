import { journalSitemap } from "@/lib/sitemaps";
import { absoluteUrl } from "@/lib/seo";
import { sitemapIndexXml, xmlResponse } from "@/lib/xml";

// Sitemap index (see lib/sitemaps.ts). Re-checked every 5 minutes so newly
// published and scheduled articles are picked up without a redeploy.
export const revalidate = 300;

export async function GET() {
  const journal = await journalSitemap();
  const journalLastmod = journal.map((url) => url.lastmod).filter(Boolean).sort().at(-1);
  return xmlResponse(
    sitemapIndexXml([
      { loc: absoluteUrl("/sitemap-pages.xml") },
      ...(journal.length ? [{ loc: absoluteUrl("/sitemap-journal.xml"), lastmod: journalLastmod }] : []),
    ]),
  );
}
