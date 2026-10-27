import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
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

/** Paginated archive shared by /journal/latest and category pages: big title, then a river of stories. */
export default function ArticleListing({ label, title, description, breadcrumbs, page, pageHref }: ArticleListingProps) {
  return (
    <>
      <header className="container jlisting-head">
        <Breadcrumbs items={breadcrumbs} />
        <p className="jlisting-label">{label}</p>
        <h1 className="jlisting-title">{title}</h1>
        {description || page.totalPages > 1 ? (
          <div className="jlisting-intro">
            {description ? <p className="jlisting-lede">{description}</p> : null}
            {page.totalPages > 1 ? (
              <p className="jlisting-count">
                Page {page.page} of {page.totalPages}
              </p>
            ) : null}
          </div>
        ) : null}
      </header>

      <section className="container jsection jsection--listing" aria-label={title}>
        {page.items.length === 0 ? (
          <div className="journal-empty">
            <h2>Nothing here yet.</h2>
            <p>
              New articles are on their way. <Link href="/journal">Back to TCF Journal</Link>
            </p>
          </div>
        ) : (
          <div className="jriver">
            {page.items.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="river" headingLevel={2} />
            ))}
          </div>
        )}
        <Pagination page={page.page} totalPages={page.totalPages} href={pageHref} />
      </section>
    </>
  );
}
