import Link from "next/link";
import ArticleCard from "@/components/journal/ArticleCard";
import SocialIcon from "@/components/ui/SocialIcon";
import { socialLinks } from "@/data/site";
import {
  categoryPath,
  getNavCategories,
  getPublishedArticles,
  journalPath,
  latestPath,
  type ArticleSummary,
} from "@/lib/journal/content";
import { buildMetadata } from "@/lib/seo";

// Re-check every 5 minutes so scheduled articles appear on time without a redeploy.
export const revalidate = 300;

const DESCRIPTION =
  "TCF Journal — articles, news and guides on creativity, design, AI, technology, marketing and business from The Creative Factory in Sri Lanka.";

export async function generateMetadata() {
  const articles = await getPublishedArticles();
  return buildMetadata({
    title: "TCF Journal — Creative, Tech & Marketing Stories",
    description: DESCRIPTION,
    path: "/journal",
    // An empty publication is thin content: keep it out of the index until the first article.
    noindex: articles.length === 0,
  });
}

/** Removes articles already placed in an earlier section, so nothing repeats on the page. */
function take(pool: ArticleSummary[], used: Set<string>, count: number, filter: (a: ArticleSummary) => boolean = () => true) {
  const picked = pool.filter((a) => !used.has(a.slug) && filter(a)).slice(0, count);
  picked.forEach((a) => used.add(a.slug));
  return picked;
}

function Masthead() {
  return (
    <header className="container jhome-masthead">
      <h1 className="jhome-title">
        <span className="journal-mark">TCF</span> JOURNAL
      </h1>
      <p className="jhome-lede">Stories, news and guides on creativity, technology and business — from The Creative Factory.</p>
    </header>
  );
}

function SectionHeader({ title, href, linkText }: { title: string; href?: string; linkText?: string }) {
  return (
    <div className="jsection-head">
      <h2 className="jsection-title">{title}</h2>
      {href ? (
        <Link href={href} className="jsection-link">
          {linkText ?? "View all"} →
        </Link>
      ) : null}
    </div>
  );
}

function FollowLinks() {
  return (
    <ul className="journal-follow-links">
      {socialLinks.map((social) => (
        <li key={social.label}>
          <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
            <SocialIcon name={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function JournalHomePage() {
  const [articles, navCategories] = await Promise.all([getPublishedArticles(), getNavCategories()]);

  if (articles.length === 0) {
    return (
      <>
        <Masthead />
        <section className="container journal-empty">
          <h2>The first stories are on their way.</h2>
          <p>
            TCF Journal will cover creative work, design, AI, technology, marketing and the business of creativity. Follow
            The Creative Factory to catch the first articles.
          </p>
          <FollowLinks />
        </section>
      </>
    );
  }

  const used = new Set<string>();
  const breaking = articles.find((a) => a.breakingNews);
  // Lead: the newest article marked Featured, else simply the newest.
  const lead = take(articles, used, 1, (a) => a.featured)[0] ?? take(articles, used, 1)[0];
  const side = take(articles, used, 2);
  const latest = take(articles, used, 5);
  const news = take(articles, used, 4, (a) => a.category.slug === "news" || a.articleType === "news");
  const picks = take(articles, used, 3, (a) => a.editorPick);
  const categorySections = navCategories
    .filter((category) => category.slug !== "news")
    .map((category) => ({ category, items: take(articles, used, 3, (a) => a.category.slug === category.slug) }))
    .filter(({ items }) => items.length >= 2)
    .slice(0, 3);
  const recent = take(articles, used, 6);

  return (
    <>
      <Masthead />

      {breaking ? (
        <div className="container">
          <Link href={journalPath(breaking.slug)} className="journal-breaking">
            <span className="journal-breaking-flag">Breaking</span>
            <span className="journal-breaking-title">{breaking.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}

      {/* Top stories: secondary column · lead story · latest headlines */}
      <section className="container jhero" aria-label="Top stories">
        <div className="jhero-lead">
          <ArticleCard article={lead} variant="feature" headingLevel={2} priority />
        </div>
        {side.length ? (
          <div className="jhero-side">
            {side.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
        {latest.length ? (
          <div className="jhero-latest">
            <h2 className="jrail-title">Latest</h2>
            <ol className="jrail-list">
              {latest.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} variant="compact" showAuthor />
                </li>
              ))}
            </ol>
            <Link href={latestPath()} className="jsection-link">
              All stories →
            </Link>
          </div>
        ) : null}
      </section>

      {news.length ? (
        <section className="container jsection" aria-label="Latest news">
          <SectionHeader title="News" href={categoryPath("news")} />
          <div className="journal-grid journal-grid--4">
            {news.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      {picks.length ? (
        <section className="jband" aria-label="Editor's picks">
          <div className="container">
            <SectionHeader title="Editor's picks" />
            <ArticleCard article={picks[0]} variant="lead" />
            {picks.length > 1 ? (
              <div className="journal-grid jband-grid">
                {picks.slice(1).map((article) => (
                  <ArticleCard key={article.slug} article={article} showExcerpt />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {categorySections.map(({ category, items }) => (
        <section key={category.slug} className="container jsection" aria-label={category.name}>
          <SectionHeader title={category.name} href={categoryPath(category.slug)} linkText={`More ${category.name}`} />
          <div className="journal-grid">
            {items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ))}

      {recent.length ? (
        <section className="container jsection" aria-label="Recent articles">
          <SectionHeader title="More stories" href={latestPath()} linkText="All stories" />
          <div className="jriver">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="river" />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container journal-follow" aria-label="Follow TCF Journal">
        <p>Follow TCF Journal</p>
        <ul className="journal-follow-links">
          <li>
            <a href="/journal/rss.xml">RSS</a>
          </li>
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
