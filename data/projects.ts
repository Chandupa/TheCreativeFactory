import type { Project } from "@/types/project";

// No portfolio content exists in the legacy site. Projects will come from
// Supabase later; until then this stays empty rather than holding invented work.
export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
