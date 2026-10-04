import type { Project } from "@/types/project";

/*
 * Case studies for /work. The legacy site had no portfolio content, so this
 * stays empty rather than holding invented work — /work is noindexed and
 * left out of the sitemap until at least one project is published.
 *
 * To add a project, copy this shape (see types/project.ts for every field):
 *
 *   {
 *     slug: "mister-potato-product-animation",
 *     title: "Mister Potato Product Animation",
 *     client: "Mister Potato",              // only with the client's permission
 *     year: 2024,
 *     services: ["animation", "post-production"],
 *     summary: "…",
 *     cover: { src: "/work/mister-potato/cover.jpg", alt: "…", width: 1920, height: 1080 },
 *     published: true,
 *     overview: ["…"], challenge: ["…"], approach: ["…"],
 *     deliverables: ["45-second 16:9 film", "15-second 9:16 cut-down"],
 *     video: { title: "…", description: "…", poster: {…}, youtubeId: "…", uploadDate: "2024-03-18" },
 *   }
 */
const allProjects: Project[] = [];

export const projects: Project[] = allProjects.filter((project) => project.published);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectPath(slug: string): string {
  return `/work/${slug}`;
}

export function getProjectsForService(serviceSlug: string, limit = 3): Project[] {
  return projects.filter((project) => project.services.includes(serviceSlug)).slice(0, limit);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const explicit = (project.related ?? [])
    .map(getProjectBySlug)
    .filter((p): p is Project => Boolean(p));
  const byService = projects.filter(
    (p) => p.slug !== project.slug && !explicit.includes(p) && p.services.some((s) => project.services.includes(s)),
  );
  return [...explicit, ...byService].slice(0, limit);
}
