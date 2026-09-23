import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return project ? { title: project.title } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{project.title}</h1>
        <p>
          {project.category} · {project.year}
        </p>
      </div>
      <div className="page-card">
        <p>{project.summary}</p>
      </div>
    </div>
  );
}
