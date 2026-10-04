import Link from "next/link";
import CTA from "@/components/home/CTA";
import PageIntro from "@/components/ui/PageIntro";
import { insightPath, insights } from "@/content/insights";
import { servicePath, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

// Noindexed (and absent from the sitemap and footer) until an article is published.
export const metadata = buildMetadata({
  title: "Insights on Film, Animation & Design",
  description:
    "Practical articles from The Creative Factory on video production, animation, design and post production — how projects are planned, made and finished.",
  path: "/insights",
  noindex: insights.length === 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        eyebrow="INSIGHTS"
        title={
          <>
            NOTES FROM <span className="accent">THE STUDIO</span>
          </>
        }
        breadcrumbs={[{ name: "Insights", path: "/insights" }]}
        lead={<p>How films, animation and design projects are planned, made and finished — from the people who make them.</p>}
      />

      <section className="section section--tight" aria-label="Articles">
        <div className="container container--narrow">
          {insights.length === 0 ? (
            <Reveal className="page-card">
              <h2>First articles coming soon</h2>
              <p>
                In the meantime, our <Link href="/services" className="text-link">services pages</Link> explain how each
                kind of project runs, with answers to common questions.
              </p>
            </Reveal>
          ) : (
            <RevealGroup as="ul" className="article-list">
              {insights.map((article) => (
                <li key={article.slug}>
                  <article className="article-item">
                    <p className="project-card-meta">
                      <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>
                    </p>
                    <h2>
                      <Link href={insightPath(article.slug)}>{article.title}</Link>
                    </h2>
                    <p>{article.description}</p>
                    <p className="project-card-tags">
                      {article.services
                        .map((slug) => services.find((s) => s.slug === slug))
                        .filter((s) => s !== undefined)
                        .map((s, i) => (
                          <span key={s.slug}>
                            {i > 0 ? " / " : null}
                            <Link href={servicePath(s.slug)}>{s.name}</Link>
                          </span>
                        ))}
                    </p>
                  </article>
                </li>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
