import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import PageIntro from "@/components/ui/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | The Creative Factory",
  absoluteTitle: true,
  description:
    "Read The Creative Factory's Privacy Policy to understand how we collect, use and protect information across our website and TCF Journal.",
  path: "/privacy-policy",
});

const LAST_UPDATED = { iso: "2026-10-04", label: "4 October 2026" };

/** Google's official ad-personalisation controls (resolves to Google "Ad Settings"). */
const GOOGLE_AD_SETTINGS = "https://adssettings.google.com/";

const SECTIONS = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "cookies", title: "Cookies and Similar Technologies" },
  { id: "advertising", title: "Google AdSense and Advertising" },
  { id: "analytics", title: "Analytics" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "external-links", title: "External Links" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Privacy Rights" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "international-visitors", title: "International Visitors" },
  { id: "changes", title: "Changes to This Privacy Policy" },
  { id: "contact", title: "Contact Us" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return (
    <Reveal as="section" variant="copy" id={id} className="policy-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>
        <span className="policy-section-number">{index + 1}.</span> {SECTIONS[index].title}
      </h2>
      {children}
    </Reveal>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="LEGAL"
        title={
          <>
            PRIVACY <span className="accent">POLICY</span>
          </>
        }
        breadcrumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
        lead={
          <p className="policy-updated">
            Last Updated: <time dateTime={LAST_UPDATED.iso}>{LAST_UPDATED.label}</time>
          </p>
        }
      />

      <div className="container policy-layout">
        <nav className="policy-toc" aria-labelledby="policy-toc-title">
          <p className="policy-toc-title" id="policy-toc-title">
            Contents
          </p>
          <ol>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="policy-body">
          <div className="policy-intro">
            <p>
              The Creative Factory (&ldquo;TCF&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your
              privacy and is committed to protecting the personal information of visitors who use our website and TCF
              Journal.
            </p>
            <p>
              This Privacy Policy explains how information may be collected, used, stored and shared when you visit
              thecreativefactory.lk, interact with our services, contact us, or read content published through TCF Journal.
            </p>
          </div>

          <Section id="information-we-collect">
            <p>
              Depending on how you interact with our website, we may collect information that you voluntarily provide,
              including:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Company or organisation name</li>
              <li>Information submitted through contact forms</li>
              <li>Project enquiries</li>
              <li>Messages or other information you choose to provide</li>
            </ul>
            <p>We may also automatically receive certain technical and usage information when you visit the website, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring pages or websites</li>
              <li>Approximate geographic information</li>
              <li>Date and time of visits</li>
              <li>Interaction and website usage information</li>
            </ul>
            <p>Some of this information may be collected through cookies and similar technologies.</p>
          </Section>

          <Section id="how-we-use-information">
            <p>We may use information collected through the website to:</p>
            <ul>
              <li>Respond to enquiries and communications</li>
              <li>Provide information about our services</li>
              <li>Process potential project or business enquiries</li>
              <li>Operate and maintain our website</li>
              <li>Publish and operate TCF Journal</li>
              <li>Understand how visitors use our website</li>
              <li>Improve website performance and user experience</li>
              <li>Measure content performance</li>
              <li>Maintain website security</li>
              <li>Detect or prevent abuse</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </Section>

          <Section id="cookies">
            <p>The Creative Factory and third-party services used by our website may use cookies and similar technologies.</p>
            <p>
              Cookies are small pieces of information stored by your browser that can be used for functionality, analytics,
              advertising, security and remembering certain preferences.
            </p>
            <p>Depending on the services enabled on our website, cookies and similar technologies may be used to:</p>
            <ul>
              <li>Understand website traffic</li>
              <li>Measure website and content performance</li>
              <li>Remember preferences</li>
              <li>Improve the website</li>
              <li>Provide and measure advertising</li>
              <li>Prevent fraud or abuse</li>
            </ul>
            <p>You can control or delete cookies through your browser settings.</p>
            <p>Disabling certain cookies may affect some website functionality.</p>
          </Section>

          <Section id="advertising">
            <p>TCF Journal may display advertisements provided through Google AdSense.</p>
            <p>
              Third-party vendors, including Google, may use cookies, web beacons, IP addresses or other identifiers in
              connection with advertisements served on our website.
            </p>
            <p>
              Google&rsquo;s use of advertising cookies enables Google and its partners to serve advertisements based on a
              user&rsquo;s visit to this website and/or other websites on the Internet.
            </p>
            <p>
              Depending on your location, consent choices and Google&rsquo;s advertising settings, advertisements may be
              personalised or non-personalised.
            </p>
            <p>
              Personalised advertising may use information about previous visits or activity to provide advertisements that
              may be more relevant to the user.
            </p>
            <p>
              Non-personalised advertising is generally selected using contextual information rather than a user&rsquo;s
              previous browsing behaviour, although cookies or similar technologies may still be used for purposes such as
              frequency capping, aggregated reporting and fraud prevention.
            </p>
            <p>
              Users may manage or opt out of personalised advertising through{" "}
              <a href={GOOGLE_AD_SETTINGS} target="_blank" rel="noopener noreferrer">
                Google&rsquo;s advertising settings
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
            <p>
              The Creative Factory does not directly control the cookies, technologies or data-processing practices used by
              Google or other third-party advertising providers.
            </p>
          </Section>

          <Section id="analytics">
            <p>We may use analytics technologies to understand how visitors interact with The Creative Factory and TCF Journal.</p>
            <p>Analytics information may include information such as:</p>
            <ul>
              <li>Pages viewed</li>
              <li>Session duration</li>
              <li>Traffic sources</li>
              <li>Browser and device information</li>
              <li>General geographic information</li>
              <li>Website interactions</li>
            </ul>
            <p>
              We use this information to understand website performance, improve our content and services, and improve the
              user experience.
            </p>
            <p>
              Where required by applicable law, analytics technologies that require consent will be used in accordance with
              the visitor&rsquo;s consent choices.
            </p>
          </Section>

          <Section id="third-party-services">
            <p>Our website may use services provided by third parties for functions such as:</p>
            <ul>
              <li>Advertising</li>
              <li>Analytics</li>
              <li>Website hosting</li>
              <li>Content delivery</li>
              <li>Security</li>
              <li>Email or communication</li>
              <li>Embedded media</li>
            </ul>
            <p>These third parties may process information according to their own privacy policies.</p>
            <p>We encourage users to review the privacy policies of relevant third-party services when appropriate.</p>
          </Section>

          <Section id="external-links">
            <p>The Creative Factory and TCF Journal may contain links to external websites.</p>
            <p>We are not responsible for the privacy practices, security or content of websites operated by third parties.</p>
            <p>Visiting an external website is subject to that website&rsquo;s own terms and privacy policies.</p>
          </Section>

          <Section id="data-security">
            <p>
              We take reasonable technical and organisational measures designed to protect personal information against
              unauthorised access, disclosure, alteration, loss or misuse.
            </p>
            <p>However, no internet transmission or electronic storage system can be guaranteed to be completely secure.</p>
          </Section>

          <Section id="data-retention">
            <p>
              We retain personal information only for as long as reasonably necessary for the purpose for which it was
              collected, including fulfilling business, operational, security and legal requirements.
            </p>
            <p>Retention periods may vary depending on the nature of the information and the reason it was collected.</p>
          </Section>

          <Section id="your-rights">
            <p>
              Depending on applicable law and your location, you may have rights relating to your personal data, which may
              include the right to:
            </p>
            <ul>
              <li>Request information about personal data we process</li>
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion where applicable</li>
              <li>Object to or restrict certain processing where applicable</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p>Certain rights may be subject to legal limitations or exceptions.</p>
            <p>
              To make a privacy-related request, please contact The Creative Factory using the contact information provided
              below.
            </p>
          </Section>

          <Section id="childrens-privacy">
            <p>
              The Creative Factory and TCF Journal are not intended to knowingly collect personal information from children
              in circumstances where parental or guardian consent would be legally required.
            </p>
            <p>
              If we become aware that personal information has been collected from a child in violation of applicable law, we
              will take appropriate steps to address it.
            </p>
          </Section>

          <Section id="international-visitors">
            <p>Our website may be accessed by visitors from different countries.</p>
            <p>
              Third-party services used by the website, including advertising, analytics, hosting and infrastructure
              providers, may process information in countries other than the country in which the visitor resides.
            </p>
            <p>Where required, such processing should be subject to appropriate legal and contractual safeguards.</p>
          </Section>

          <Section id="changes">
            <p>
              We may update this Privacy Policy periodically to reflect changes to our website, services, technology,
              advertising practices or applicable requirements.
            </p>
            <p>When the policy is updated, the &ldquo;Last Updated&rdquo; date at the top of this page will be revised.</p>
            <p>We encourage visitors to review this page periodically.</p>
          </Section>

          <Section id="contact">
            <p>
              If you have questions about this Privacy Policy, the information we collect, or how your personal information is
              handled, please contact:
            </p>
            <address className="policy-address">
              <strong>The Creative Factory</strong>
              <br />
              Sri Lanka
              <br />
              <br />
              Website:
              <br />
              <Link href="/">thecreativefactory.lk</Link>
            </address>
            <p>
              Please use the contact details or <Link href="/contact">contact form</Link> available on our website for
              privacy-related enquiries.
            </p>
          </Section>
        </article>
      </div>
    </>
  );
}
