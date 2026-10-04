import Link from "next/link";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ArticleSummary, Page } from "@/lib/journal/content";
import type { Crumb } from "@/lib/schema";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";

interface ArticleListingProps {
  label: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  page: Page<ArticleSummary>;
  pageHref: (page: number) => string;
}

/** Paginated grid shared by /journal/latest and category pages. */
export default function ArticleListing({ label, title, description, breadcrumbs, page, pageHref }: ArticleListingProps) {
  const first = page.items.slice(0, 6);
  const rest = page.items.slice(6);

  return (
    <>
      <header className="container journal-listing-head">
        <Breadcrumbs items={breadcrumbs} />
        <SectionLabel>{label}</SectionLabel>
        <RevealText as="h1" display className="journal-listing-title">
          {title}
        </RevealText>
        {description ? (
          <p className="journal-listing-lede" data-reveal="copy">
            {description}
          </p>
        ) : null}
        {page.totalPages > 1 ? (
          <p className="journal-listing-count">
            Page {page.page} of {page.totalPages}
          </p>
        ) : null}
      </header>

      <section className="container journal-section journal-section--listing" aria-label={title}>
        {page.items.length === 0 ? (
          <div className="journal-empty">
            <h2>Nothing here yet.</h2>
            <p>
              New articles are on their way. <Link href="/journal">Back to TCF Journal</Link>
            </p>
          </div>
        ) : (
          <>
            <RevealGroup variant="card" className="journal-grid">
              {first.map((article) => (
                <ArticleCard key={article.slug} article={article} headingLevel={2} showExcerpt />
              ))}
            </RevealGroup>
            {rest.length ? (
              <>
                <RevealGroup variant="card" className="journal-grid journal-grid--continued">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} headingLevel={2} showExcerpt />
                  ))}
                </RevealGroup>
              </>
            ) : null}
          </>
        )}
        <Pagination page={page.page} totalPages={page.totalPages} href={pageHref} />
      </section>
    </>
  );
}
