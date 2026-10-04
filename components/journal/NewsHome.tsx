import Link from "next/link";
import { RevealGroup } from "@/components/motion/Reveal";
import { categoryPath, journalPath, type ArticleSummary, type Category } from "@/lib/journal/content";
import { matchesSection, type CategoryPage } from "@/lib/journal/categoryPages";
import { formatClock, formatShortDate, localDay } from "@/lib/journal/time";
import AdSlot from "./AdSlot";
import ArticleCard from "./ArticleCard";
import { CategoryEnding, CategoryHero, CategorySection, EmptyCategory } from "./CategoryHome";
import TimeAgo from "./TimeAgo";

/*
 * /journal/category/news — a denser, newsroom-style page. Its pool is every
 * live article in the News category plus any article marked "News" as its
 * content type, newest first. Only real published stories; no invented feed.
 */

/** Compact news row: category, headline, time (relative when under a day old). */
function NewsItem({ article, headingLevel = 3 }: { article: ArticleSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="jnews-item">
      <p className="jcard-kicker">
        {article.breakingNews ? <span className="jcard-flag">Breaking</span> : null}
        <Link href={categoryPath(article.category.slug)}>{article.category.name}</Link>
      </p>
      <Heading className="jnews-item-title">
        <Link href={journalPath(article.slug)}>{article.title}</Link>
      </Heading>
      <TimeAgo iso={article.publishedAt} fallback={formatShortDate(article.publishedAt)} className="jnews-time" />
    </article>
  );
}

export default function NewsHome({
  page,
  category,
  pool,
}: {
  page: CategoryPage;
  category: Category;
  /** News-category articles and articles typed as news, newest first. */
  pool: ArticleSummary[];
}) {
  if (!pool.length) {
    return (
      <div className="jcat jcat--news">
        <CategoryHero page={page} category={category} />
        <EmptyCategory page={page} message="Nothing published here yet. Check back soon." />
      </div>
    );
  }

  const [lead, ...rest] = pool;
  const beside = rest.slice(0, 5);
  const feed = pool.slice(0, 12);
  const used = new Set([lead.slug, ...beside.map((a) => a.slug)]);
  const sections = page.sections
    .map((section) => ({ section, items: rest.filter((a) => !used.has(a.slug) && matchesSection(a, section)).slice(0, 4) }))
    .filter(({ items }) => items.length > 0);
  sections.forEach(({ items }) => items.forEach((a) => used.add(a.slug)));
  const popular = pool.filter((a) => a.editorPick).slice(0, 5);

  // Group the feed by Sri Lanka calendar day, newest first.
  const days = new Map<string, ArticleSummary[]>();
  for (const article of feed) {
    const key = localDay(article.publishedAt);
    days.set(key, [...(days.get(key) ?? []), article]);
  }

  let index = 1;
  const next = () => ++index;

  return (
    <div className="jcat jcat--news">
      <CategoryHero page={page} category={category} />

      <CategorySection index={next()} title={page.editTitle} className="jcat-section--edit">
        {beside.length ? (
          <div className="jnews-top">
            <ArticleCard article={lead} variant="feature" priority showAuthor />
            <div className="jnews-beside">
              {beside.map((a) => (
                <NewsItem key={a.slug} article={a} />
              ))}
            </div>
          </div>
        ) : (
          // A lone story fills the row side-by-side instead of leaving an empty column.
          <ArticleCard article={lead} variant="lead" priority showAuthor />
        )}
      </CategorySection>

      <div className="jnews-columns container">
        <CategorySection index={next()} title={page.latestTitle} className="jnews-feed-section">
          <div className="jnews-feed">
            {[...days.entries()].map(([day, items]) => (
              <div key={day} className="jnews-day">
                <p className="jnews-day-label">{formatShortDate(items[0].publishedAt)}</p>
                <ol>
                  {items.map((a) => (
                    <li key={a.slug}>
                      <time dateTime={a.publishedAt} className="jnews-clock">
                        {formatClock(a.publishedAt)}
                      </time>
                      <span className="jnews-feed-category">{a.category.name}</span>
                      <Link href={journalPath(a.slug)} className="jnews-feed-title">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CategorySection>

        {popular.length ? (
          <CategorySection index={next()} title="POPULAR" description="Selected by the editors." className="jnews-popular-section">
            <ol className="jcat-popular">
              {popular.map((a) => (
                <li key={a.slug}>
                  <NewsItem article={a} />
                </li>
              ))}
            </ol>
          </CategorySection>
        ) : null}
      </div>

      <div className="container">
        <AdSlot placement="listing" />
      </div>

      {sections.map(({ section, items }) => (
        <CategorySection key={section.title} index={next()} title={section.title}>
          <RevealGroup className="journal-grid journal-grid--4" variant="card">
            {items.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </RevealGroup>
        </CategorySection>
      ))}

      <CategoryEnding page={page} index={next()} />
    </div>
  );
}
