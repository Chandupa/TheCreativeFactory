import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  categoryPath,
  getArticlesByCategory,
  getCategory,
  getPublishedArticles,
  latestPath,
  paginate,
} from "@/lib/journal/content";
import { buildMetadata } from "@/lib/seo";
import { getCategoryPage } from "@/lib/journal/categoryPages";
import ArticleListing from "./ArticleListing";
import CategoryHome from "./CategoryHome";
import NewsHome from "./NewsHome";

/*
 * Shared logic for the paginated Journal routes:
 *   /journal/latest, /journal/latest/page/[page]
 *   /journal/category/[category], /journal/category/[category]/page/[page]
 * Page 1 lives only at the unnumbered URL (/page/1 redirects there), pages
 * past the end 404, and every page is self-canonical so Google can crawl
 * through to older articles.
 */

/** "2" → 2, "1" → 1; "02", "abc", "-3" → NaN. */
export function parsePageParam(raw: string): number {
  return /^[1-9]\d*$/.test(raw) ? Number(raw) : NaN;
}

// ---------------------------------------------------------------- latest

export async function latestMetadata(pageNumber: number): Promise<Metadata> {
  const articles = await getPublishedArticles();
  const page = paginate(articles, pageNumber);
  if (!page) return {};
  return buildMetadata({
    title: pageNumber > 1 ? `Latest Stories, Page ${pageNumber} — TCF Journal` : "Latest Stories — TCF Journal",
    description: "Every TCF Journal article, newest first — creativity, design, AI, technology, marketing and business.",
    path: latestPath(pageNumber),
    noindex: articles.length === 0,
  });
}

export async function LatestListing({ pageNumber }: { pageNumber: number }) {
  const page = paginate(await getPublishedArticles(), pageNumber);
  if (!page) notFound();
  return (
    <ArticleListing
      label="TCF JOURNAL"
      title="Latest stories"
      description="Everything we've published, newest first."
      breadcrumbs={[
        { name: "Journal", path: "/journal" },
        { name: "Latest", path: latestPath(pageNumber) },
      ]}
      page={page}
      pageHref={latestPath}
    />
  );
}

// ---------------------------------------------------------------- category

export async function categoryMetadata(slug: string, pageNumber: number): Promise<Metadata> {
  const category = await getCategory(slug);
  if (!category) return {};
  const articles = await getArticlesByCategory(slug);
  if (!paginate(articles, pageNumber)) return {};
  const editorial = getCategoryPage(slug);
  if (editorial && pageNumber === 1) {
    // Editorial category homepages carry real hero copy and section structure, so they're indexable even before the first article.
    return buildMetadata({ title: editorial.seo.title, absoluteTitle: true, description: editorial.seo.description, path: categoryPath(slug) });
  }
  return buildMetadata({
    title: pageNumber > 1 ? `${category.name}, Page ${pageNumber} — TCF Journal` : `${category.name} — TCF Journal`,
    description: category.description,
    path: categoryPath(slug, pageNumber),
    // Empty categories are thin pages: indexable only once they have articles.
    noindex: articles.length === 0,
  });
}

export async function CategoryListing({ slug, pageNumber }: { slug: string; pageNumber: number }) {
  const category = await getCategory(slug);
  if (!category) notFound();

  // Page 1 of an editorial category is its magazine-style homepage; older pages stay a plain archive.
  const editorial = getCategoryPage(slug);
  if (editorial && pageNumber === 1) {
    if (slug === "news") {
      const pool = (await getPublishedArticles()).filter((a) => a.category.slug === "news" || a.articleType === "news");
      return <NewsHome page={editorial} category={category} pool={pool} />;
    }
    return <CategoryHome page={editorial} category={category} articles={await getArticlesByCategory(slug)} />;
  }

  const page = paginate(await getArticlesByCategory(slug), pageNumber);
  if (!page) notFound();
  return (
    <ArticleListing
      label="TCF JOURNAL"
      title={category.name}
      description={category.description}
      breadcrumbs={[
        { name: "Journal", path: "/journal" },
        { name: category.name, path: categoryPath(slug, pageNumber) },
      ]}
      page={page}
      pageHref={(n) => categoryPath(slug, n)}
    />
  );
}

/** Redirects /…/page/1 to the unnumbered URL; 404s anything that isn't a page number ≥ 2. */
export function resolveNumberedPage(raw: string, firstPageUrl: string): number {
  const n = parsePageParam(raw);
  if (n === 1) permanentRedirect(firstPageUrl);
  if (!Number.isInteger(n)) notFound();
  return n;
}
