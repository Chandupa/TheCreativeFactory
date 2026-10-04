import Link from "next/link";
import CTA from "@/components/home/CTA";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/ui/Icon";
import PageIntro from "@/components/ui/PageIntro";
import WhyUs from "@/components/services/WhyUs";
import { servicePath, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { RevealGroup } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Creative, Production & Marketing Services",
  description:
    "Design, animation, film, videography, photography, post production, game development, SEO and performance marketing from The Creative Factory, Sri Lanka.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemListSchema(services.map((s) => ({ name: s.headline, path: servicePath(s.slug) })))} />
      <PageIntro
        eyebrow="WHAT WE DO"
        title={
          <>
            CREATIVE, PRODUCTION &amp; MARKETING <span className="accent">SERVICES</span>
          </>
        }
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        lead={
          <p>
            From the first sketch of a brand to the final grade of a film — and the campaigns that put it in front of
            the right people — our services are designed to work together. Use one on its own, or bring us the whole
            project and we&apos;ll carry it from concept to results.
          </p>
        }
      />

      <section className="section service-hub" aria-label="Services">
        <div className="container">
          <RevealGroup as="ul" className="service-hub-list">
            {services.map((service, index) => (
              <li key={service.slug}>
                <article className="service-hub-item">
                  <div className="service-hub-head">
                    <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="service-icon">
                      <Icon name={service.icon} />
                    </span>
                  </div>
                  <div className="service-hub-body">
                    <h2>
                      <Link href={servicePath(service.slug)}>{service.name}</Link>
                    </h2>
                    <p>{service.summary}</p>
                    <ul className="tag-list" aria-label={`${service.name} capabilities`}>
                      {service.capabilities.map((capability) => (
                        <li key={capability.name}>{capability.name}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={servicePath(service.slug)}
                    className="btn btn--outline service-hub-cta"
                    aria-label={`Explore ${service.name.toLowerCase()} services`}
                  >
                    EXPLORE
                  </Link>
                </article>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhyUs />
      <CTA title="NOT SURE WHERE TO START?" accent="TELL US ABOUT YOUR PROJECT" />
    </>
  );
}
