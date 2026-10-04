import type { ReactNode } from "react";
import Link from "next/link";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { categoryPath, JOURNAL_PAGE_SIZE, type ArticleSummary, type Category } from "@/lib/journal/content";
import { matchesSection, type CategoryPage, type SectionLayout } from "@/lib/journal/categoryPages";
import AdSlot from "./AdSlot";
import ArticleCard from "./ArticleCard";

/*
 * Editorial category homepage: 01 hero · 02 the edit (lead) · 03 latest ·
 * 04 topic sections · 05 popular (editor-selected) · 06 more stories ·
 * 07 closing line + TCF CTA. Composition varies per category through
 * lib/journal/categoryPages.ts (lead layout, section layouts, personality).
 * Every article appears at most once on the page.
 */

// ---------------------------------------------------------------- shared pieces

export function CategoryHero({ page, category }: { page: CategoryPage; category: Category }) {
  return (
    <header className="container jcat-hero">
      <Breadcrumbs
        items={[
          { name: "Journal", path: "/journal" },
          { name: category.name, path: categoryPath(category.slug) },
        ]}
      />
      <p className="jcat-index" data-reveal="fade">
        <span>01</span> TCF JOURNAL / {category.name.toUpperCase()}
      </p>
      <RevealText as="h1" display className="jcat-title">
        {page.heading.map((line, i) => (
          <span key={line}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </RevealText>
      <div className="jcat-intro" data-reveal="copy">
        <p className="jcat-intro-lead">
          {page.intro.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
        {page.secondary ? <p className="jcat-intro-secondary">{page.secondary}</p> : null}
      </div>
    </header>
  );
}

export function CategorySection({
  index,
  title,
  description,
  aside,
  children,
  className = "",
}: {
  index: number;
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const id = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section className={`container jcat-section ${className}`} aria-labelledby={id}>
      <div className="jcat-section-head">
        <div>
          <p className="jcat-section-index">{String(index).padStart(2, "0")}</p>
          <h2 className="jcat-section-title" id={id}>
            {title}
          </h2>
          {description ? <p className="jcat-section-desc">{description}</p> : null}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function CategoryEnding({ page, index }: { page: CategoryPage; index: number }) {
  return (
    <section className="container jcat-ending" aria-label="From The Creative Factory">
      <p className="jcat-section-index">{String(index).padStart(2, "0")}</p>
      <RevealText as="p" display className="jcat-ending-line">
        {page.ending.map((line, i) => (
          <span key={line} className={i === page.ending.length - 1 ? "accent" : undefined}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </RevealText>
      <div className="jcat-ending-cta" data-reveal="copy">
        <p>{page.cta.text}</p>
        <Link href={page.cta.href} className="btn btn--primary">
          {page.cta.label}
        </Link>
      </div>
    </section>
  );
}

/** Honest empty state: what the category will cover, no invented stories. */
export function EmptyCategory({ page, message = "Stories are being made." }: { page: CategoryPage; message?: string }) {
  return (
    <>
      <section className="container jcat-empty" aria-labelledby="jcat-empty-title">
        <h2 id="jcat-empty-title" className="jcat-empty-title">
          {message}
        </h2>
        <p>Nothing has been published in this section yet. Here&apos;s what it will cover — check back soon.</p>
        <RevealGroup as="ul" variant="card" className="jcat-coverage">
          {page.sections.map((section, i) => (
            <li key={section.title}>
              <span className="jcat-section-index">{String(i + 2).padStart(2, "0")}</span>
              <h3>{section.title}</h3>
              {section.description ? <p>{section.description}</p> : null}
            </li>
          ))}
        </RevealGroup>
      </section>
      <CategoryEnding page={page} index={page.sections.length + 2} />
    </>
  );
}

function SectionStories({ articles, layout }: { articles: ArticleSummary[]; layout: SectionLayout }) {
  if (layout === "list") {
    return (
      <RevealGroup className="jcat-list" variant="copy">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="text" showAuthor />
        ))}
      </RevealGroup>
    );
  }
  if (layout === "duo") {
    return (
      <RevealGroup className="journal-grid jcat-duo" variant="card">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="feature" />
        ))}
      </RevealGroup>
    );
  }
  return (
    <RevealGroup className={layout === "row" ? "journal-grid journal-grid--4" : "journal-grid"} variant="card">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </RevealGroup>
  );
}

const SECTION_SIZE: Record<SectionLayout, number> = { grid: 3, duo: 2, list: 4, row: 4 };

// ---------------------------------------------------------------- lead compositions

function TheEdit({ page, lead, secondary }: { page: CategoryPage; lead: ArticleSummary; secondary: ArticleSummary[] }) {
  // A lone story fills the row side-by-side instead of leaving an empty column.
  if (!secondary.length) return <ArticleCard article={lead} variant="lead" priority showAuthor />;
  switch (page.leadLayout) {
    case "banner":
      return (
        <div className="jcat-edit jcat-edit--banner">
          <ArticleCard article={lead} variant="feature" priority showAuthor />
          {secondary.length ? (
            <div className="journal-grid">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : null}
        </div>
      );
    case "mosaic":
      return (
        <div className="jcat-edit jcat-edit--mosaic">
          <ArticleCard article={lead} variant="feature" priority showAuthor />
          {secondary.slice(0, 2).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      );
    case "split":
      return (
        <div className="jcat-edit jcat-edit--split">
          <ArticleCard article={lead} variant="lead" priority showAuthor />
          {secondary.length ? (
            <div className="journal-grid">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : null}
        </div>
      );
    case "text":
      return (
        <div className="jcat-edit jcat-edit--text">
          <ArticleCard article={lead} variant="feature" priority showAuthor />
          {secondary.length ? (
            <div className="jcat-list">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="text" showAuthor />
              ))}
            </div>
          ) : null}
        </div>
      );
    default:
      return (
        <div className="jcat-edit jcat-edit--stack">
          <ArticleCard article={lead} variant="feature" priority showAuthor />
          {secondary.length ? (
            <div className="jcat-stack">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          ) : null}
        </div>
      );
  }
}

// ---------------------------------------------------------------- page

export default function CategoryHome({
  page,
  category,
  articles,
}: {
  page: CategoryPage;
  category: Category;
  articles: ArticleSummary[];
}) {
  if (!articles.length) {
    return (
      <div className={`jcat jcat--${page.personality}`}>
        <CategoryHero page={page} category={category} />
        <EmptyCategory page={page} />
      </div>
    );
  }

  const used = new Set<string>();
  const take = (count: number, filter: (a: ArticleSummary) => boolean = () => true) => {
    const picked = articles.filter((a) => !used.has(a.slug) && filter(a)).slice(0, count);
    picked.forEach((a) => used.add(a.slug));
    return picked;
  };

  const lead = take(1, (a) => a.featured)[0] ?? take(1)[0];
  const secondary = take(3);
  const latest = take(4);
  const sections = page.sections
    .map((section) => ({ section, items: take(SECTION_SIZE[section.layout], (a) => matchesSection(a, section)) }))
    .filter(({ items }) => items.length > 0);
  const popular = take(4, (a) => a.editorPick);
  const more = take(6);

  let index = 1;
  const next = () => ++index;

  return (
    <div className={`jcat jcat--${page.personality}`}>
      <CategoryHero page={page} category={category} />

      <CategorySection index={next()} title={page.editTitle} className="jcat-section--edit">
        <TheEdit page={page} lead={lead} secondary={secondary} />
      </CategorySection>

      <div className="container">
        <AdSlot placement="listing" />
      </div>

      {latest.length ? (
        <CategorySection index={next()} title={page.latestTitle}>
          <RevealGroup className="journal-grid journal-grid--4" variant="card">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </RevealGroup>
        </CategorySection>
      ) : null}

      {sections.map(({ section, items }, i) => (
        <div key={section.title}>
          <CategorySection index={next()} title={section.title} description={section.description}>
            <SectionStories articles={items} layout={section.layout} />
          </CategorySection>
          {i === 1 ? (
            <div className="container">
              <AdSlot placement="listing" />
            </div>
          ) : null}
        </div>
      ))}

      {popular.length ? (
        <CategorySection
          index={next()}
          title="POPULAR"
          description="Selected by the editors."
          className="jcat-section--popular"
        >
          <ol className="jcat-popular">
            {popular.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} variant="compact" />
              </li>
            ))}
          </ol>
        </CategorySection>
      ) : null}

      {more.length ? (
        <>
          <div className="container">
            <AdSlot placement="listing" />
          </div>
          <CategorySection
            index={next()}
            title="MORE STORIES"
            aside={
              articles.length > JOURNAL_PAGE_SIZE ? (
                <Link href={categoryPath(category.slug, 2)} className="journal-section-link">
                  Older stories →
                </Link>
              ) : null
            }
          >
            <RevealGroup className="journal-grid" variant="card">
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} showExcerpt />
              ))}
            </RevealGroup>
          </CategorySection>
        </>
      ) : null}

      <CategoryEnding page={page} index={next()} />
    </div>
  );
}
