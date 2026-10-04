import Image from "next/image";
import Link from "next/link";
import { categoryPath, journalPath, type ArticleSummary } from "@/lib/journal/content";
import { formatShortDate } from "@/lib/journal/time";

interface ArticleCardProps {
  article: ArticleSummary;
  /**
   * lead = big story, image beside copy · feature = big image above, large headline
   * standard = image above · compact = small text row · text = headline-led, no image
   */
  variant?: "lead" | "feature" | "standard" | "compact" | "text";
  headingLevel?: 2 | 3;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  /** Preload the image (only for the above-the-fold lead story — it's the LCP element). */
  priority?: boolean;
}

const SIZES = {
  lead: "(min-width: 1024px) 60vw, 100vw",
  feature: "(min-width: 1024px) 60vw, 100vw",
  standard: "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
} as const;

export default function ArticleCard({
  article,
  variant = "standard",
  headingLevel = 3,
  showExcerpt = variant === "lead" || variant === "feature" || variant === "text",
  showAuthor = false,
  priority = false,
}: ArticleCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = journalPath(article.slug);

  return (
    <article className={`jcard jcard--${variant}`}>
      {variant !== "compact" && variant !== "text" ? (
        // The title link is the accessible one; the image link duplicates it for pointer users only.
        <Link href={href} className="jcard-media" tabIndex={-1} aria-hidden="true">
          <Image
            src={article.featuredImage}
            alt=""
            fill
            sizes={SIZES[variant]}
            preload={priority}
            loading={priority ? undefined : "lazy"}
          />
        </Link>
      ) : null}
      <div className="jcard-body">
        <p className="jcard-kicker">
          {article.breakingNews ? <span className="jcard-flag">Breaking</span> : null}
          <Link href={categoryPath(article.category.slug)}>{article.category.name}</Link>
        </p>
        <Heading className="jcard-title">
          <Link href={href}>{article.title}</Link>
        </Heading>
        {showExcerpt ? <p className="jcard-excerpt">{article.excerpt}</p> : null}
        <p className="jcard-meta">
          {showAuthor ? (
            <>
              <span className="jcard-author">{article.author.name}</span>
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          <time dateTime={article.publishedAt}>{formatShortDate(article.publishedAt)}</time>
          <span aria-hidden="true"> · </span>
          {article.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
