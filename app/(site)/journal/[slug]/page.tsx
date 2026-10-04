import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/journal/ArticleBody";
import ArticleCard from "@/components/journal/ArticleCard";
import ArticleTracking from "@/components/journal/ArticleTracking";
import ShareBar from "@/components/journal/ShareBar";
import TrackedLink from "@/components/journal/TrackedLink";
import { RevealGroup } from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceBySlug, servicePath } from "@/data/services";
import {
  categoryPath,
  getArticle,
  getArticlesByCategory,
  getPublishedArticles,
  getRelatedArticles,
  isLive,
  journalPath,
} from "@/lib/journal/content";
import { formatLongDate } from "@/lib/journal/time";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import type { Service } from "@/types/service";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Published articles are prebuilt; scheduled ones render on first request after
// their publish time. Unknown slugs and drafts 404 (see getArticle).
export const dynamicParams = true;
export const revalidate = 300;

const isDev = process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  return (await getPublishedArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle((await params).slug, { preview: isDev });
  if (!article) return {};
  const ogImage = article.ogImage ?? article.featuredImage;
  return buildMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: journalPath(article.slug),
    canonical: article.canonicalUrl ?? undefined,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    image: { url: ogImage, alt: article.featuredImageAlt },
    article: { section: article.category.name, tags: article.tags, authors: [article.author.name] },
    // Local draft previews must never be indexable.
    noindex: !isLive(article),
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle((await params).slug, { preview: isDev });
  if (!article) notFound();

  const path = journalPath(article.slug);
  const isPreview = !isLive(article);
  const services = article.relatedServices.map(getServiceBySlug).filter((s): s is Service => Boolean(s));
  const [related, inCategory, all] = await Promise.all([
    getRelatedArticles(article, 3),
    getArticlesByCategory(article.category.slug),
    getPublishedArticles(),
  ]);
  const shown = new Set([article.slug, ...related.map((a) => a.slug)]);
  const sidebar = inCategory.filter((a) => !shown.has(a.slug)).slice(0, 4);
  sidebar.forEach((a) => shown.add(a.slug));
  const more = all.filter((a) => !shown.has(a.slug)).slice(0, 3);
  const updated = article.updatedAt && article.updatedAt !== article.publishedAt ? article.updatedAt : null;

  return (
    <>
      <JsonLd
        data={articleSchema({
          type: article.articleType,
          title: article.title,
          description: article.seoDescription || article.excerpt,
          path,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          author: { name: article.author.name, role: article.author.role, url: article.author.url },
          images: [...new Set([article.featuredImage, article.ogImage].filter((src): src is string => Boolean(src)))],
          section: article.category.name,
          tags: article.tags,
        })}
      />
      <ArticleTracking
        slug={article.slug}
        category={article.category.slug}
        author={article.author.slug}
        type={article.articleType}
      />

      <article className="jarticle">
        {isPreview ? (
          <p className="jarticle-preview" role="status">
            Preview — this article is a {article.status} and is not public. (Visible only in local development.)
          </p>
        ) : null}

        <header className="container jarticle-header">
          <Breadcrumbs
            items={[
              { name: "Journal", path: "/journal" },
              { name: article.category.name, path: categoryPath(article.category.slug) },
              { name: article.title, path },
            ]}
          />
          <p className="jarticle-kicker">
            {article.breakingNews ? <span className="jcard-flag">Breaking</span> : null}
            <Link href={categoryPath(article.category.slug)}>{article.category.name}</Link>
          </p>
          <h1 className="jarticle-title">{article.title}</h1>
          <p className="jarticle-standfirst">{article.excerpt}</p>
          <div className="jarticle-byline">
            {article.author.avatar ? (
              <Image src={article.author.avatar} alt="" width={44} height={44} className="jarticle-avatar" />
            ) : null}
            <div>
              <p className="jarticle-author">By {article.author.name}</p>
              <p className="jarticle-dates">
                <time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time>
                {updated ? (
                  <>
                    {" "}
                    · Updated <time dateTime={updated}>{formatLongDate(updated)}</time>
                  </>
                ) : null}{" "}
                · {article.readingMinutes} min read
              </p>
            </div>
          </div>
        </header>

        {/* The hero image is the LCP element: preloaded and deliberately not animated. */}
        <figure className="container jarticle-hero">
          <div className="jarticle-hero-media">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              preload
              sizes="(min-width: 1400px) 1352px, calc(100vw - 32px)"
            />
          </div>
          {article.featuredImageCaption ? <figcaption>{article.featuredImageCaption}</figcaption> : null}
        </figure>

        <div className="container jarticle-layout">
          <div className="jarticle-main">
            {/* Ads are injected inside the body by ArticleBody (see lib/journal/ads.ts). */}
            <ArticleBody content={article.content} articleSlug={article.slug} />

            {article.tags.length ? (
              <ul className="jarticle-tags" aria-label="Tags">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`/journal/search?q=${encodeURIComponent(tag)}`} rel="nofollow">
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <ShareBar url={absoluteUrl(path)} title={article.title} slug={article.slug} />

            {services.length ? (
              <aside className="jarticle-cta" aria-label="Work with The Creative Factory">
                <p className="jarticle-cta-label">From The Creative Factory</p>
                <p className="jarticle-cta-title">
                  Planning something like this? We offer{" "}
                  {services.map((service, i) => (
                    <span key={service.slug}>
                      {i > 0 ? (i === services.length - 1 ? " and " : ", ") : null}
                      <TrackedLink href={servicePath(service.slug)} cta="journal_service" articleSlug={article.slug}>
                        {service.name.toLowerCase()}
                      </TrackedLink>
                    </span>
                  ))}
                  .
                </p>
                <TrackedLink href="/contact" className="btn btn--primary" cta="journal_contact" articleSlug={article.slug}>
                  START A PROJECT
                </TrackedLink>
              </aside>
            ) : null}

            <aside className="jarticle-author-card" aria-label="About the author">
              {article.author.avatar ? (
                <Image src={article.author.avatar} alt="" width={72} height={72} className="jarticle-avatar" />
              ) : null}
              <div>
                <p className="jarticle-author-name">
                  {article.author.url ? (
                    <a href={article.author.url} target="_blank" rel="noopener noreferrer author">
                      {article.author.name}
                    </a>
                  ) : (
                    article.author.name
                  )}
                </p>
                {article.author.role ? <p className="jarticle-author-role">{article.author.role}</p> : null}
                {article.author.bio ? <p className="jarticle-author-bio">{article.author.bio}</p> : null}
              </div>
            </aside>
          </div>

          {sidebar.length ? (
            <aside className="jarticle-aside" aria-label={`More in ${article.category.name}`}>
              <div className="jarticle-aside-sticky">
                <h2 className="journal-mini-title">More in {article.category.name}</h2>
                <div className="journal-compact-list">
                  {sidebar.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </article>

      {related.length ? (
        <section className="container journal-section" aria-labelledby="related-title">
          <h2 className="journal-section-title" id="related-title">
            Related articles
          </h2>
          <RevealGroup variant="card" className="journal-grid">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {more.length ? (
        <section className="container journal-section" aria-labelledby="more-title">
          <h2 className="journal-section-title" id="more-title">
            More from TCF Journal
          </h2>
          <RevealGroup variant="card" className="journal-grid">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </RevealGroup>
        </section>
      ) : null}
    </>
  );
}
