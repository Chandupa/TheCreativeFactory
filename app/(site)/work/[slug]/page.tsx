import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/home/CTA";
import VideoPlayer from "@/components/media/VideoPlayer";
import RelatedServices from "@/components/services/RelatedServices";
import JsonLd from "@/components/seo/JsonLd";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import RelatedProjects from "@/components/work/RelatedProjects";
import { getProjectBySlug, getRelatedProjects, projectPath, projects } from "@/data/projects";
import { getServiceBySlug, servicePath } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { creativeWorkSchema, videoObjectSchema } from "@/lib/schema";
import type { Service } from "@/types/service";
import { Reveal, RevealGroup, RevealImage, RevealText } from "@/components/motion/Reveal";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  return buildMetadata({
    title: project.client ? `${project.title} for ${project.client}` : project.title,
    description: project.summary,
    path: projectPath(project.slug),
    image: { url: project.cover.src, alt: project.cover.alt, width: project.cover.width, height: project.cover.height },
  });
}

/** A titled block of paragraphs; renders nothing when the field is empty. */
function StorySection({ id, label, title, paragraphs }: { id: string; label: string; title: string; paragraphs?: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="case-section" aria-labelledby={id}>
      <SectionLabel>{label}</SectionLabel>
      <RevealText id={id}>{title}</RevealText>
      {paragraphs.map((paragraph) => (
        <Reveal as="p" variant="copy" key={paragraph.slice(0, 32)}>
          {paragraph}
        </Reveal>
      ))}
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const path = projectPath(project.slug);
  const projectServices = project.services.map(getServiceBySlug).filter((s): s is Service => Boolean(s));
  const video = project.video;

  return (
    <>
      <JsonLd
        data={[
          creativeWorkSchema({
            title: project.title,
            description: project.summary,
            path,
            year: project.year,
            image: project.cover.src,
          }),
          video?.uploadDate
            ? videoObjectSchema({
                name: video.title,
                description: video.description,
                thumbnailUrl: video.poster.src,
                uploadDate: video.uploadDate,
                contentUrl: video.src,
                embedUrl: video.youtubeId
                  ? `https://www.youtube.com/embed/${video.youtubeId}`
                  : video.vimeoId
                    ? `https://player.vimeo.com/video/${video.vimeoId}`
                    : undefined,
                duration: video.duration,
              })
            : null,
        ]}
      />

      <PageIntro
        eyebrow={projectServices.map((s) => s.name).join(" / ") || "CASE STUDY"}
        title={project.title}
        breadcrumbs={[
          { name: "Work", path: "/work" },
          { name: project.title, path },
        ]}
        lead={<p>{project.summary}</p>}
      />

      <section className="section section--tight" aria-label="Project media">
        <div className="container">
          {video ? (
            <Reveal>
              <VideoPlayer video={video} />
            </Reveal>
          ) : (
            <RevealImage className="case-cover">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1400px) 1400px, 100vw"
                preload
              />
            </RevealImage>
          )}
        </div>
      </section>

      <div className="container case-layout">
        <Reveal as="aside" className="case-facts" aria-label="Project details">
          <dl>
            {project.client ? (
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
            ) : null}
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            {projectServices.length ? (
              <div>
                <dt>Services</dt>
                <dd>
                  <ul>
                    {projectServices.map((service) => (
                      <li key={service.slug}>
                        <Link href={servicePath(service.slug)} className="text-link">
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
            {project.deliverables?.length ? (
              <div>
                <dt>Deliverables</dt>
                <dd>
                  <ul>
                    {project.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </Reveal>

        <article className="case-body">
          <StorySection id="overview" label="OVERVIEW" title="The project" paragraphs={project.overview} />
          <StorySection id="challenge" label="THE BRIEF" title="The challenge" paragraphs={project.challenge} />
          <StorySection id="approach" label="THE IDEA" title="Creative approach" paragraphs={project.approach} />
          <StorySection id="production" label="PRODUCTION" title="How it was made" paragraphs={project.production} />

          {project.results?.length ? (
            <section className="case-section" aria-labelledby="results">
              <SectionLabel>RESULTS</SectionLabel>
              <RevealText id="results">Results</RevealText>
              <RevealGroup as="dl" variant="card" className="case-results">
                {project.results.map((result) => (
                  <div key={result.label}>
                    <dt>{result.label}</dt>
                    <dd>{result.value}</dd>
                  </div>
                ))}
              </RevealGroup>
            </section>
          ) : null}
        </article>
      </div>

      {project.gallery?.length ? (
        <section className="section section--tight" aria-label="Gallery">
          <div className="container">
            <RevealGroup as="ul" variant="image" className="case-gallery">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </li>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <RelatedServices services={projectServices} label="SERVICES ON THIS PROJECT" title="What we did" />
      <RelatedProjects projects={getRelatedProjects(project)} label="MORE WORK" title="Related projects" />
      <CTA
        label="START A PROJECT"
        title="HAVE A SIMILAR PROJECT?"
        accent="LET'S TALK"
        primary={{ label: "DISCUSS YOUR PROJECT", href: "/contact" }}
        secondary={{ label: "MORE WORK", href: "/work" }}
      />
    </>
  );
}
