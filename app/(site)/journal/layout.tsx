import type { ReactNode } from "react";
import Script from "next/script";
import JournalNav from "@/components/journal/JournalNav";
import { adsEnabled, adsenseClient } from "@/lib/journal/ads";
import { getNavCategories } from "@/lib/journal/content";

/**
 * TCF Journal shell: the Journal section bar under the site header, the RSS
 * autodiscovery link, and — only here, and only once configured — the
 * AdSense script. The agency pages never load it.
 */
export default async function JournalLayout({ children }: { children: ReactNode }) {
  const categories = await getNavCategories();

  return (
    <div className="journal">
      {/* React hoists this into <head>. */}
      <link rel="alternate" type="application/rss+xml" title="TCF Journal" href="/journal/rss.xml" />
      <JournalNav categories={categories.map(({ slug, name }) => ({ slug, name }))} />
      {children}
      {adsEnabled && adsenseClient ? (
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      ) : null}
    </div>
  );
}
