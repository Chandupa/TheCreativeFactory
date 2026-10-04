import type { MetadataRoute } from "next";
import { insightPath, insights } from "@/content/insights";
import { projectPath, projects } from "@/data/projects";
import { servicePath, services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Canonical, indexable URLs only — generated from the same data as the pages,
 * so new services, case studies and articles appear automatically. /work and
 * /insights are listed only once they have published content (until then they
 * are noindexed placeholders).
 *
 * lastModified is set only where a real date exists (article publish/update
 * dates); other pages omit it rather than claim a fresh date on every build.
 * changefreq/priority are left out because Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/services") },
    ...services.map((service) => ({ url: absoluteUrl(servicePath(service.slug)) })),
    { url: absoluteUrl("/about") },
    { url: absoluteUrl("/contact") },
    { url: absoluteUrl("/copyright") },
  ];

  if (projects.length) {
    entries.push(
      { url: absoluteUrl("/work") },
      ...projects.map((project) => ({ url: absoluteUrl(projectPath(project.slug)) })),
    );
  }

  if (insights.length) {
    entries.push(
      { url: absoluteUrl("/insights") },
      ...insights.map((article) => ({
        url: absoluteUrl(insightPath(article.slug)),
        lastModified: article.updatedAt ?? article.publishedAt,
      })),
    );
  }

  return entries;
}
