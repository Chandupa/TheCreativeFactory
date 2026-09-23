import Link from "next/link";
import { contactInfo, footerLinks } from "@/data/site";
import CurrentYear from "@/components/ui/CurrentYear";
import DmcaBadge from "@/components/ui/DmcaBadge";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TheCreativeFactory</h3>
          <p>
            Film Production | Post Production | Animation. <br /> Server Hosting | Web Hosting.
          </p>
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
            <p style={{ marginTop: 10 }}>{contactInfo.email}</p>
            <p>{contactInfo.phoneDisplay}</p>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <DmcaBadge size="small" />
        <p>
          &copy; <CurrentYear /> TheCreativeFactory. All rights reserved. ESTD 2019.
        </p>
      </div>
    </footer>
  );
}
