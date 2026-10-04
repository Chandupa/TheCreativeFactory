import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/journal/ArticleCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { getNavCategories, categoryPath, searchArticles } from "@/lib/journal/content";
import { buildMetadata } from "@/lib/seo";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

// Search result pages are crawlable for their links but never indexed themselves.
export const metadata: Metadata = buildMetadata({
  title: "Search — TCF Journal",
  description: "Search TCF Journal articles by title, topic, category or tag.",
  path: "/journal/search",
  noindex: true,
});

export default async function JournalSearchPage({ searchParams }: SearchPageProps) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? "";
  const [results, categories] = await Promise.all([query ? searchArticles(query) : Promise.resolve([]), getNavCategories()]);

  return (
    <>
      <header className="container journal-listing-head">
        <SectionLabel>TCF JOURNAL</SectionLabel>
        <h1 className="journal-listing-title">Search</h1>
        {/* A plain GET form: works without JavaScript, and results are shareable URLs. */}
        <form action="/journal/search" method="get" role="search" className="journal-search-form">
          <label htmlFor="journal-q" className="sr-only">
            Search articles
          </label>
          <input id="journal-q" type="search" name="q" defaultValue={query} placeholder="Search articles, topics, tags…" maxLength={100} />
          <button type="submit" className="btn btn--primary">
            SEARCH
          </button>
        </form>
      </header>

      <section className="container journal-section journal-section--listing" aria-live="polite">
        {query ? (
          <p className="journal-listing-count">
            {results.length === 0
              ? `No articles match “${query}”.`
              : `${results.length} ${results.length === 1 ? "article" : "articles"} for “${query}”`}
          </p>
        ) : null}

        {results.length ? (
          <div className="journal-grid">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} headingLevel={2} showExcerpt />
            ))}
          </div>
        ) : (
          <div className="journal-search-browse">
            <h2 className="journal-mini-title">Browse by topic</h2>
            <ul className="tag-list">
              <li>
                <Link href="/journal/latest">Latest</Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={categoryPath(category.slug)}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
