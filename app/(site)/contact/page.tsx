import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
};

// New page: the legacy site linked to contact.html, which never existed.
// Styled with the copyright page's visual language.
export default function ContactPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Ready to build your brand? Tell us about your project.</p>
      </div>

      <div className="page-card">
        <h2>Send Us a Message</h2>
        <ContactForm />
      </div>

      <div className="page-card contact-details">
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
      </div>
    </div>
  );
}
