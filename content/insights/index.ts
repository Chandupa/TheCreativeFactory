import type { Insight } from "@/types/insight";

/*
 * Articles for /insights. Deliberately empty: nothing is published until it
 * contains real, first-hand expertise. /insights stays noindexed and out of
 * the sitemap (and out of the footer) until the first article is published.
 *
 * To add an article:
 *   1. Create content/insights/<slug>.tsx:
 *
 *        import type { InsightMeta } from "@/types/insight";
 *        export const meta: InsightMeta = {
 *          slug: "video-production-cost-sri-lanka",
 *          title: "How Much Does Video Production Cost in Sri Lanka?",
 *          description: "…",
 *          publishedAt: "2026-10-14",
 *          author: "Chandupa Weerakkody",
 *          services: ["film-production", "post-production"],
 *          published: true,
 *        };
 *        export default function Body() {
 *          return (<><p>…</p><h2>…</h2><p>…</p></>);
 *        }
 *
 *   2. Register it below: `{ ...videoCost.meta, Body: VideoCostBody }`.
 *
 * Topics with strong search intent, to write when there is real material:
 *   - How much does video production cost in Sri Lanka?
 *   - TV commercial vs social media video
 *   - 2D vs 3D animation: which suits your project?
 *   - The product animation production process
 *   - How a commercial video production works, step by step
 *   - Preparing for a product shoot
 *   - What professional colour grading adds
 *   - Motion graphics for advertising
 */
const allInsights: Insight[] = [];

export const insights: Insight[] = allInsights
  .filter((insight) => insight.published)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function insightPath(slug: string): string {
  return `/insights/${slug}`;
}

export function getInsightsForService(serviceSlug: string, limit = 3): Insight[] {
  return insights.filter((insight) => insight.services.includes(serviceSlug)).slice(0, limit);
}
