import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { getServiceBySlug } from "@/data/services";

/** Portfolio tile: cover, title, client/year and the services involved. */
export default function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const serviceNames = project.services.map((slug) => getServiceBySlug(slug)?.name).filter(Boolean);

  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}`} className="project-card-link">
        <div className="project-card-media">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="project-card-body">
          <p className="project-card-meta">
            {[project.client, project.year].filter(Boolean).join(" · ")}
          </p>
          <Heading className="project-card-title">{project.title}</Heading>
          <p className="project-card-summary">{project.summary}</p>
          {serviceNames.length ? <p className="project-card-tags">{serviceNames.join(" / ")}</p> : null}
        </div>
      </Link>
    </article>
  );
}
