import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { contactInfo } from "@/data/site";
import { servicePath, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { Reveal, RevealGroup, RevealText } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Contact Us & Start a Project",
  description:
    "Start a project with The Creative Factory in Sri Lanka — film, photography, animation, design, games, SEO or ads. Call, email or send us a message.",
  path: "/contact",
});

// New page: the legacy site linked to contact.html, which never existed.
// Styled with the copyright page's visual language.
export default function ContactPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <RevealText as="h1" display>
          Contact Us
        </RevealText>
        <Reveal as="p" variant="copy">
          Ready to start? Tell us about your project and we&apos;ll get back to you.
        </Reveal>
      </div>

      <Reveal className="page-card">
        <h2>Send Us a Message</h2>
        <ContactForm />
      </Reveal>

      <Reveal className="page-card contact-details">
        <h2>Get In Touch</h2>
        <p>
          {contactInfo.company}
          <br />
          {contactInfo.address}
        </p>
        <p>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <br />
          <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
        </p>
      </Reveal>

      <Reveal className="page-card contact-details">
        <h2>What We Can Help With</h2>
        <RevealGroup as="ul" variant="fade" className="tag-list">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={servicePath(service.slug)}>{service.name}</Link>
            </li>
          ))}
        </RevealGroup>
      </Reveal>
    </div>
  );
}
