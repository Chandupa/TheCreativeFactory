import type { MetadataRoute } from "next";
import { insightPath, insights } from "@/content/insights";
import { projectPath, projects } from "@/data/projects";
import { servicePath, services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Canonical, indexable URLs only — generated from the same data as the pages,
 * so new services, case studies and articles appear automatically. /work and
 * /insights are listed only once they have published content (until then they
 * are noindexed placeholders). Static pages carry no lastModified rather than
 * an invented date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(service.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/copyright"), changeFrequency: "yearly", priority: 0.2 },
  ];

  if (projects.length) {
    entries.push(
      { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.8 },
      ...projects.map((project) => ({
        url: absoluteUrl(projectPath(project.slug)),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
    );
  }

  if (insights.length) {
    entries.push(
      { url: absoluteUrl("/insights"), changeFrequency: "weekly", priority: 0.6 },
      ...insights.map((article) => ({
        url: absoluteUrl(insightPath(article.slug)),
        lastModified: article.updatedAt ?? article.publishedAt,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    );
  }

  return entries;
}
