import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/home/CTA";
import RelatedServices from "@/components/services/RelatedServices";
import JsonLd from "@/components/seo/JsonLd";
import PageIntro from "@/components/ui/PageIntro";
import RelatedProjects from "@/components/work/RelatedProjects";
import { getInsightBySlug, insightPath, insights } from "@/content/insights";
import { getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import type { Project } from "@/types/project";
import type { Service } from "@/types/service";
import { Reveal } from "@/components/motion/Reveal";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const article = getInsightBySlug((await params).slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: insightPath(article.slug),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    image: article.cover
      ? { url: article.cover.src, alt: article.cover.alt, width: article.cover.width, height: article.cover.height }
      : undefined,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightPage({ params }: InsightPageProps) {
  const article = getInsightBySlug((await params).slug);
  if (!article) notFound();

  const path = insightPath(article.slug);
  const relatedServices = article.services.map(getServiceBySlug).filter((s): s is Service => Boolean(s));
  const relatedProjects = (article.projects ?? []).map(getProjectBySlug).filter((p): p is Project => Boolean(p));
  const { Body } = article;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          authorName: article.author,
          image: article.cover?.src,
        })}
      />

      <PageIntro
        eyebrow="INSIGHTS"
        title={article.title}
        breadcrumbs={[
          { name: "Insights", path: "/insights" },
          { name: article.title, path },
        ]}
        lead={
          <p className="article-byline">
            By {article.author} ·{" "}
            <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>
            {article.updatedAt ? (
              <>
                {" "}
                · Updated <time dateTime={article.updatedAt}>{dateFormat.format(new Date(article.updatedAt))}</time>
              </>
            ) : null}
          </p>
        }
      />

      <article className="section section--tight">
        <Reveal variant="copy" className="container container--narrow prose">
          <Body />
          {relatedServices.length ? (
            <p className="article-next">
              Planning a project like this? See our{" "}
              {relatedServices.map((service, i) => (
                <span key={service.slug}>
                  {i > 0 ? (i === relatedServices.length - 1 ? " and " : ", ") : null}
                  <Link href={`/services/${service.slug}`}>{service.name.toLowerCase()} services</Link>
                </span>
              ))}
              , or <Link href="/contact">get in touch</Link>.
            </p>
          ) : null}
        </Reveal>
      </article>

      <RelatedProjects projects={relatedProjects} label="IN PRACTICE" title="Related work" />
      <RelatedServices services={relatedServices} />
      <CTA />
    </>
  );
}
