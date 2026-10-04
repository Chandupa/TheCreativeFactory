import "server-only";
import { projectPath, projects } from "@/data/projects";
import { servicePath, services } from "@/data/services";
import { categoryPages } from "@/lib/journal/categoryPages";
import { categoryPath, getCategories, getPublishedArticles, journalPath } from "@/lib/journal/content";
import { absoluteUrl } from "@/lib/seo";
import type { SitemapUrl } from "@/lib/xml";

/*
 * Sitemap index at /sitemap.xml →
 *   /sitemap-pages.xml    agency pages (services, about, contact, case studies)
 *   /sitemap-journal.xml  TCF Journal: home, categories with articles, articles
 * A Google News sitemap (/sitemap-news.xml) can be added the same way from
 * getRecentNews() once the Journal publishes genuine news.
 *
 * Canonical, indexable URLs only. /work joins once it has a published case
 * study (it's a noindexed placeholder until then). Drafts and future
 * scheduled articles never appear (getPublishedArticles filters them).
 */

export function pagesSitemap(): SitemapUrl[] {
  const urls: SitemapUrl[] = [
    { loc: absoluteUrl("/") },
    { loc: absoluteUrl("/services") },
    ...services.map((service) => ({ loc: absoluteUrl(servicePath(service.slug)) })),
    { loc: absoluteUrl("/about") },
    { loc: absoluteUrl("/contact") },
    { loc: absoluteUrl("/copyright") },
    { loc: absoluteUrl("/privacy-policy") },
  ];
  if (projects.length) {
    urls.push({ loc: absoluteUrl("/work") }, ...projects.map((p) => ({ loc: absoluteUrl(projectPath(p.slug)) })));
  }
  return urls;
}

/**
 * Editorial category homepages (lib/journal/categoryPages.ts) are always
 * listed; the Journal home, Latest and other categories once they have articles.
 */
export async function journalSitemap(): Promise<SitemapUrl[]> {
  const articles = await getPublishedArticles();
  const allCategories = await getCategories();
  const editorial = allCategories.filter((c) => c.slug in categoryPages);
  if (!articles.length) return editorial.map((c) => ({ loc: absoluteUrl(categoryPath(c.slug)) }));

  const lastmodOf = (a: (typeof articles)[number]) => a.updatedAt ?? a.publishedAt;
  const newest = (list: typeof articles) => list.map(lastmodOf).sort().at(-1);

  const categories = allCategories
    .map((category) => ({
      category,
      items: articles.filter((a) =>
        // The News page also carries articles typed as news from other categories.
        category.slug === "news" ? a.category.slug === "news" || a.articleType === "news" : a.category.slug === category.slug,
      ),
    }))
    .filter(({ category, items }) => items.length > 0 || category.slug in categoryPages);

  return [
    { loc: absoluteUrl("/journal"), lastmod: newest(articles) },
    { loc: absoluteUrl("/journal/latest"), lastmod: newest(articles) },
    ...categories.map(({ category, items }) => ({ loc: absoluteUrl(categoryPath(category.slug)), lastmod: newest(items) })),
    // Articles whose canonical points elsewhere (syndicated) don't belong in our sitemap.
    ...articles
      .filter((a) => !a.canonicalUrl)
      .map((a) => ({ loc: absoluteUrl(journalPath(a.slug)), lastmod: lastmodOf(a) })),
  ];
}
