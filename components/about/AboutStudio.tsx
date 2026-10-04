import Link from "next/link";
import { contactInfo, siteConfig } from "@/data/site";
import { servicePath, services } from "@/data/services";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

/** Company facts for the About page — all taken from the existing site content. */
export default function AboutStudio() {
  return (
    <section className="section" aria-labelledby="studio-title">
      <div className="panel bio-panel" data-depth={40}>
        <div>
          <SectionLabel>THE STUDIO</SectionLabel>
          <RevealText className="section-title" id="studio-title">
            ABOUT THE <span className="accent">CREATIVE FACTORY</span>
          </RevealText>
        </div>
        <RevealGroup variant="copy" className="bio-copy">
          <p>
            The Creative Factory is a creative agency and production studio in Sri Lanka, founded in{" "}
            {siteConfig.foundingYear} and based in {contactInfo.addressParts.addressLocality}, in the Colombo District.
            We work across{" "}
            {services.map((service, index) => (
              <span key={service.slug}>
                <Link href={servicePath(service.slug)} className="text-link">
                  {service.name.toLowerCase()}
                </Link>
                {index < services.length - 2 ? ", " : index === services.length - 2 ? " and " : ""}
              </span>
            ))}
            , taking projects from the first idea to final delivery.
          </p>
          <p className="bio-emphasis">
            Our philosophy is in the name of every project we take on: see the unseen, tell the untold.
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
