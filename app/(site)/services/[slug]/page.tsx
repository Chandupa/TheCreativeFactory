import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/home/CTA";
import RelatedServices from "@/components/services/RelatedServices";
import WhyUs from "@/components/services/WhyUs";
import JsonLd from "@/components/seo/JsonLd";
import Faq from "@/components/ui/Faq";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import RelatedProjects from "@/components/work/RelatedProjects";
import { getInsightsForService, insightPath } from "@/content/insights";
import { getProjectsForService, projects } from "@/data/projects";
import { getRelatedServices, getServiceBySlug, servicePath, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: servicePath(service.slug),
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();

  const path = servicePath(service.slug);
  const work = getProjectsForService(service.slug);
  const articles = getInsightsForService(service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: service.name, headline: service.headline, metaDescription: service.metaDescription, path }),
          faqSchema(service.faqs),
        ]}
      />

      <PageIntro
        eyebrow={service.name}
        title={service.headline}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ]}
        lead={service.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        actions={
          <>
            <Link href="/contact" className="btn btn--primary">
              DISCUSS YOUR PROJECT
            </Link>
            {/* Until case studies are published, /work is a placeholder — point to the studio instead. */}
            {projects.length ? (
              <Link href="/work" className="btn btn--outline">
                VIEW OUR WORK
              </Link>
            ) : (
              <Link href="/about" className="btn btn--outline">
                ABOUT THE STUDIO
              </Link>
            )}
          </>
        }
      />

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <div className="section-head">
            <SectionLabel>CAPABILITIES</SectionLabel>
            <RevealText className="section-title" id="capabilities-title">
              What we <span className="accent">deliver</span>
            </RevealText>
          </div>
          <RevealGroup
            as="ul"
            variant="card"
            className={service.capabilities.length === 4 ? "detail-grid detail-grid--4" : "detail-grid"}
          >
            {service.capabilities.map((capability) => (
              <li key={capability.name} className="detail-card">
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="process-title">
        <div className="panel process-panel" data-depth={40}>
          <div className="section-head">
            <SectionLabel>OUR PROCESS</SectionLabel>
            <RevealText className="section-title" id="process-title">
              How we approach <span className="accent">{service.name.toLowerCase()}</span>
            </RevealText>
          </div>
          <RevealGroup as="ol" variant="card" className="process-steps">
            {service.process.map((step, index) => (
              <li key={step.title} className="process-step">
                <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      <RelatedProjects projects={work} title={`${service.name} work`} />

      <WhyUs />

      <section className="section section--tight" aria-labelledby="faq-title">
        <div className="container container--narrow">
          <div className="section-head">
            <SectionLabel>FAQ</SectionLabel>
            <RevealText className="section-title" id="faq-title">
              Common <span className="accent">questions</span>
            </RevealText>
          </div>
          <Faq items={service.faqs} />
          {articles.length ? (
            <RevealGroup as="ul" variant="fade" className="inline-links">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link href={insightPath(article.slug)}>{article.title} →</Link>
                </li>
              ))}
            </RevealGroup>
          ) : null}
        </div>
      </section>

      <RelatedServices services={getRelatedServices(service)} />

      <CTA
        label="START A PROJECT"
        title={service.cta.title.toUpperCase()}
        accent={service.cta.accent.toUpperCase()}
        primary={{ label: "DISCUSS YOUR PROJECT", href: "/contact" }}
        secondary={{ label: "ALL SERVICES", href: "/services" }}
      />
    </>
  );
}
