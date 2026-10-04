import Link from "next/link";
import CTA from "@/components/home/CTA";
import JsonLd from "@/components/seo/JsonLd";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCard from "@/components/work/ProjectCard";
import { projectPath, projects } from "@/data/projects";
import { servicePath, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

// With no published case studies this page is a placeholder, so it stays out
// of the index (and the sitemap) until the first project goes live.
export const metadata = buildMetadata({
  title: "Our Work & Case Studies",
  description:
    "Selected case studies from The Creative Factory — film, animation, design, photography, games and digital marketing for brands in Sri Lanka.",
  path: "/work",
  noindex: projects.length === 0,
});

export default function WorkPage() {
  return (
    <>
      {projects.length ? (
        <JsonLd data={itemListSchema(projects.map((p) => ({ name: p.title, path: projectPath(p.slug) })))} />
      ) : null}

      <PageIntro
        eyebrow="OUR WORK"
        title={
          <>
            SELECTED <span className="accent">WORK</span>
          </>
        }
        breadcrumbs={[{ name: "Work", path: "/work" }]}
        lead={
          <p>
            Films, animation, design and games made for brands — each case study covers the brief, the idea and how it
            was produced.
          </p>
        }
      />

      <section className="section section--tight" aria-label="Projects">
        <div className="container">
          {projects.length === 0 ? (
            <Reveal className="page-card">
              <h2>Case studies coming soon</h2>
              <p>
                We&apos;re preparing our portfolio. In the meantime, explore what we do:{" "}
                {services.map((service, index) => (
                  <span key={service.slug}>
                    <Link href={servicePath(service.slug)} className="text-link">
                      {service.name.toLowerCase()}
                    </Link>
                    {index < services.length - 2 ? ", " : index === services.length - 2 ? " and " : "."}
                  </span>
                ))}
              </p>
              <Link href="/contact" className="btn btn--primary">
                START A PROJECT
              </Link>
            </Reveal>
          ) : (
            <RevealGroup variant="project" className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} headingLevel={2} />
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <CTA secondary={{ label: "OUR SERVICES", href: "/services" }} />
    </>
  );
}
