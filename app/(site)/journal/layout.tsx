import type { ReactNode } from "react";
import JournalNav from "@/components/journal/JournalNav";
import { getNavCategories } from "@/lib/journal/content";

/**
 * TCF Journal shell: the Journal section bar under the site header and the RSS
 * autodiscovery link. (The AdSense script is loaded only by article pages that
 * show an ad — see components/journal/AdSlot.tsx.)
 */
export default async function JournalLayout({ children }: { children: ReactNode }) {
  const categories = await getNavCategories();

  return (
    <div className="journal">
      {/* React hoists this into <head>. */}
      <link rel="alternate" type="application/rss+xml" title="TCF Journal" href="/journal/rss.xml" />
      <JournalNav categories={categories.map(({ slug, name }) => ({ slug, name }))} />
      {children}
    </div>
  );
}
