import Link from "next/link";
import AdSlot from "@/components/journal/AdSlot";
import ArticleCard from "@/components/journal/ArticleCard";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
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
    <header className="journal-masthead container">
      <RevealText as="h1" display className="journal-masthead-title">
        TCF <span className="accent">JOURNAL</span>
      </RevealText>
      <p className="journal-masthead-lede" data-reveal="copy">
        Stories, news and guides on creativity, technology and business — from The Creative Factory.
      </p>
    </header>
  );
}

function SectionHeader({ label, title, href, linkText }: { label: string; title: string; href?: string; linkText?: string }) {
  return (
    <div className="journal-section-head">
      <div>
        <SectionLabel>{label}</SectionLabel>
        <RevealText className="journal-section-title">{title}</RevealText>
      </div>
      {href ? (
        <Link href={href} className="journal-section-link">
          {linkText ?? "View all"} →
        </Link>
      ) : null}
    </div>
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
          <ul className="journal-follow-links">
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

  const used = new Set<string>();
  const breaking = articles.find((a) => a.breakingNews);
  // Lead: the newest article marked Featured, else simply the newest.
  const lead = take(articles, used, 1, (a) => a.featured)[0] ?? take(articles, used, 1)[0];
  const latest = take(articles, used, 4);
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

      {/* Lead story + latest headlines */}
      <section className="container journal-top" aria-label="Top stories">
        <ArticleCard article={lead} variant="lead" headingLevel={2} priority />
        {latest.length ? (
          <div className="journal-top-latest">
            <h2 className="journal-mini-title">Latest</h2>
            <RevealGroup className="journal-compact-list" variant="copy">
              {latest.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="compact" />
              ))}
            </RevealGroup>
            <Link href={latestPath()} className="journal-section-link">
              All stories →
            </Link>
          </div>
        ) : null}
      </section>

      <div className="container">
        <AdSlot placement="listing" />
      </div>

      {news.length ? (
        <section className="container journal-section" aria-label="Latest news">
          <SectionHeader label="NEWS" title="Latest news" href={categoryPath("news")} />
          <RevealGroup variant="card" className="journal-grid journal-grid--4">
            {news.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {picks.length ? (
        <section className="container journal-section" aria-label="Editor's picks">
          <SectionHeader label="EDITOR'S PICKS" title="Worth your time" />
          <RevealGroup variant="card" className="journal-grid">
            {picks.map((article) => (
              <ArticleCard key={article.slug} article={article} showExcerpt />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {categorySections.map(({ category, items }) => (
        <section key={category.slug} className="container journal-section" aria-label={category.name}>
          <SectionHeader label="CATEGORY" title={category.name} href={categoryPath(category.slug)} linkText={`More ${category.name}`} />
          <RevealGroup variant="card" className="journal-grid">
            {items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </RevealGroup>
        </section>
      ))}

      {recent.length ? (
        <section className="container journal-section" aria-label="Recent articles">
          <SectionHeader label="RECENT" title="More from the Journal" href={latestPath()} linkText="All stories" />
          <RevealGroup variant="card" className="journal-grid">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </RevealGroup>
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
