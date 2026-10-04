import Link from "next/link";
import { contactInfo, footerLinks, siteConfig, socialLinks } from "@/data/site";
import { servicePath, services } from "@/data/services";
import CurrentYear from "@/components/ui/CurrentYear";
import DmcaBadge from "@/components/ui/DmcaBadge";
import SocialIcon from "@/components/ui/SocialIcon";
import FooterBrandMark from "./FooterBrandMark";
import Logo from "./Logo";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";


export default function Footer() {
  return (
    <footer className="site-footer">
      <FooterBrandMark />

      <RevealGroup variant="copy" className="container footer-top">
        <div className="footer-brand">
          <Logo className="logo logo--left" />
          <p>
            Creative agency &amp; production studio in Sri Lanka. <br />
            Design | Animation | Film &amp; Photography | Games | SEO &amp; Performance Marketing.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-section" aria-labelledby="footer-services">
          <h2 id="footer-services">Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-section" aria-labelledby="footer-links">
          <h2 id="footer-links">Quick Links</h2>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-section">
          <h2>Contact</h2>
          <address>
            <p>{contactInfo.company}</p>
            <p>{contactInfo.address}</p>
            <p>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
            <p>
              <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
            </p>
          </address>
        </div>
      </RevealGroup>

      <Reveal variant="fade" className="container footer-bottom">
        <p>
          &copy; <CurrentYear /> {siteConfig.name}. All rights reserved. ESTD {siteConfig.foundingYear}.
        </p>
        <DmcaBadge size="small" />
      </Reveal>
    </footer>
  );
}
