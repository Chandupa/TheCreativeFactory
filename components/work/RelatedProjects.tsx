import type { Project } from "@/types/project";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "./ProjectCard";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

interface RelatedProjectsProps {
  projects: Project[];
  label?: string;
  title?: string;
}

/** Renders nothing until matching published projects exist. */
export default function RelatedProjects({ projects, label = "SELECTED WORK", title = "Related projects" }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="section related-section" aria-labelledby="related-projects-title">
      <div className="container">
        <div className="section-head">
          <SectionLabel>{label}</SectionLabel>
          <RevealText className="section-title" id="related-projects-title">
            {title}
          </RevealText>
        </div>
        <RevealGroup variant="project" className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
