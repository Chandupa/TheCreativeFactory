import "server-only";
import { cache } from "react";
import type { Node } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { countWords, plainText, readingMinutes } from "./text";
import { toIsoDateTime, toTimestamp } from "./time";

/*
 * The one place Journal content is read and filtered. Every public surface —
 * pages, listings, search, sitemap, RSS, service-page links — goes through the
 * functions below, so draft and not-yet-due scheduled articles can't leak.
 */

export type ArticleStatus = "draft" | "scheduled" | "published";

export interface Category {
  slug: string;
  name: string;
  description: string;
  order: number;
  showInNav: boolean;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string | null;
  url: string | null;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  status: ArticleStatus;
  /** ISO 8601 with offset. */
  publishedAt: string;
  updatedAt: string | null;
  articleType: "article" | "news";
  category: Category;
  tags: string[];
  author: Author;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
  featured: boolean;
  editorPick: boolean;
  breakingNews: boolean;
  relatedServices: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string | null;
  ogImage: string | null;
  readingMinutes: number;
  /** Lower-cased title, excerpt, tags, category and body, for search. */
  searchText: string;
}

export interface Article extends ArticleSummary {
  content: Node;
}

export const JOURNAL_PAGE_SIZE = 12;

const reader = createReader(process.cwd(), keystaticConfig);

export function journalPath(slug: string): string {
  return `/journal/${slug}`;
}

export function categoryPath(slug: string, page = 1): string {
  return page > 1 ? `/journal/category/${slug}/page/${page}` : `/journal/category/${slug}`;
}

export function latestPath(page = 1): string {
  return page > 1 ? `/journal/latest/page/${page}` : "/journal/latest";
}

/** Live = not a draft, and its publish date has arrived (covers scheduled articles). */
export function isLive(article: ArticleSummary, now = Date.now()): boolean {
  return article.status !== "draft" && toTimestamp(article.publishedAt) <= now;
}

/** Everything on disk, parsed once per request/build. Includes drafts — never export this. */
const loadAll = cache(async () => {
  const [categoryEntries, authorEntries, articleEntries] = await Promise.all([
    reader.collections.categories.all(),
    reader.collections.authors.all(),
    reader.collections.articles.all({ resolveLinkedFiles: true }),
  ]);

  const categories = new Map<string, Category>(
    categoryEntries.map(({ slug, entry }) => [
      slug,
      { slug, name: entry.name, description: entry.description, order: entry.order ?? 100, showInNav: entry.showInNav },
    ]),
  );
  const authors = new Map<string, Author>(
    authorEntries.map(({ slug, entry }) => [
      slug,
      { slug, name: entry.name, role: entry.role, bio: entry.bio, avatar: entry.avatar, url: entry.url },
    ]),
  );

  const articles: Article[] = [];
  for (const { slug, entry } of articleEntries) {
    const category = entry.category ? categories.get(entry.category) : undefined;
    const author = entry.author ? authors.get(entry.author) : undefined;
    // Incomplete entries (e.g. a deleted category) are skipped rather than rendered half-broken.
    if (!category || !author || !entry.publishedAt || !entry.featuredImage) continue;

    const content = entry.content.node;
    const body = plainText(content);
    articles.push({
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      status: entry.status as ArticleStatus,
      publishedAt: toIsoDateTime(entry.publishedAt),
      updatedAt: entry.updatedAt ? toIsoDateTime(entry.updatedAt) : null,
      articleType: entry.articleType as "article" | "news",
      category,
      tags: entry.tags.map((tag) => tag.trim()).filter(Boolean),
      author,
      featuredImage: entry.featuredImage,
      featuredImageAlt: entry.featuredImageAlt,
      featuredImageCaption: entry.featuredImageCaption,
      featured: entry.featured,
      editorPick: entry.editorPick,
      breakingNews: entry.breakingNews,
      relatedServices: [...entry.relatedServices],
      seoTitle: entry.seoTitle,
      seoDescription: entry.seoDescription,
      canonicalUrl: entry.canonicalUrl,
      ogImage: entry.ogImage,
      readingMinutes: readingMinutes(countWords(body)),
      searchText: [entry.title, entry.excerpt, category.name, ...entry.tags, body].join("\n").toLowerCase(),
      content,
    });
  }
  articles.sort((a, b) => toTimestamp(b.publishedAt) - toTimestamp(a.publishedAt));

  return { categories, authors, articles };
});

function summarize(article: Article): ArticleSummary {
  const summary: Partial<Article> = { ...article };
  delete summary.content;
  return summary as ArticleSummary;
}

// ---------------------------------------------------------------- categories

export async function getCategories(): Promise<Category[]> {
  const { categories } = await loadAll();
  return [...categories.values()].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getNavCategories(): Promise<Category[]> {
  return (await getCategories()).filter((category) => category.showInNav);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return (await loadAll()).categories.get(slug);
}

// ---------------------------------------------------------------- articles

/** Published (and due scheduled) articles, newest first. */
export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  const now = Date.now();
  return (await loadAll()).articles.filter((article) => isLive(article, now)).map(summarize);
}

/**
 * A single article if it is live. With `preview` (local development only),
 * drafts and future-scheduled articles are returned too, for checking layout
 * while writing — never in production.
 */
export async function getArticle(slug: string, { preview = false } = {}): Promise<Article | undefined> {
  const article = (await loadAll()).articles.find((a) => a.slug === slug);
  if (!article) return undefined;
  if (isLive(article)) return article;
  return preview && process.env.NODE_ENV === "development" ? article : undefined;
}

export async function getArticlesByCategory(categorySlug: string): Promise<ArticleSummary[]> {
  return (await getPublishedArticles()).filter((article) => article.category.slug === categorySlug);
}

/** Same category first, then shared tags; never the article itself. */
export async function getRelatedArticles(article: ArticleSummary, limit = 3): Promise<ArticleSummary[]> {
  const tags = new Set(article.tags.map((tag) => tag.toLowerCase()));
  return (await getPublishedArticles())
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category.slug === article.category.slug ? 2 : 0) +
        candidate.tags.filter((tag) => tags.has(tag.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Articles the author linked to a service — for "From the Journal" on service pages. */
export async function getArticlesForService(serviceSlug: string, limit = 3): Promise<ArticleSummary[]> {
  return (await getPublishedArticles()).filter((a) => a.relatedServices.includes(serviceSlug)).slice(0, limit);
}

/**
 * Simple ranked search over live articles: title > tags/category > excerpt > body.
 * Fine for hundreds of articles; swap for a hosted index here if it grows past that.
 */
export async function searchArticles(query: string, limit = 30): Promise<ArticleSummary[]> {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 1);
  if (!terms.length) return [];
  return (await getPublishedArticles())
    .map((article) => {
      if (!terms.every((term) => article.searchText.includes(term))) return { article, score: 0 };
      const title = article.title.toLowerCase();
      const meta = [article.category.name, ...article.tags].join(" ").toLowerCase();
      const excerpt = article.excerpt.toLowerCase();
      const score = terms.reduce(
        (sum, term) => sum + 1 + (title.includes(term) ? 6 : 0) + (meta.includes(term) ? 4 : 0) + (excerpt.includes(term) ? 2 : 0),
        0,
      );
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
}

/**
 * Genuine news published in the last 48 hours — the input a Google News
 * sitemap (/sitemap-news.xml) would need if one is added later.
 */
export async function getRecentNews(hours = 48): Promise<ArticleSummary[]> {
  const cutoff = Date.now() - hours * 3600_000;
  return (await getPublishedArticles()).filter(
    (article) => article.articleType === "news" && toTimestamp(article.publishedAt) >= cutoff,
  );
}

// ---------------------------------------------------------------- pagination

export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/** Returns undefined for out-of-range pages so routes can 404. Page 1 always exists. */
export function paginate<T>(items: T[], page: number, size = JOURNAL_PAGE_SIZE): Page<T> | undefined {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  if (!Number.isInteger(page) || page < 1 || page > totalPages) return undefined;
  return { items: items.slice((page - 1) * size, page * size), page, totalPages };
}
