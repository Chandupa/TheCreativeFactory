import Link from "next/link";
import { contactInfo, footerLinks, socialLinks } from "@/data/site";
import CurrentYear from "@/components/ui/CurrentYear";
import DmcaBadge from "@/components/ui/DmcaBadge";
import SocialIcon from "@/components/ui/SocialIcon";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo className="logo logo--left" />
          <p>
            Film Production | Post Production | Animation. <br /> Server Hosting | Web Hosting.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
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
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; <CurrentYear /> TheCreativeFactory. All rights reserved. ESTD 2019.
        </p>
        <DmcaBadge size="small" />
      </div>
    </footer>
  );
}
