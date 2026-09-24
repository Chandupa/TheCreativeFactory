"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo, mainNav, socialLinks } from "@/data/site";
import Icon from "@/components/ui/Icon";
import SocialIcon from "@/components/ui/SocialIcon";
import Logo from "./Logo";

/**
 * Socials left, logo centre, actions right; the menu button opens a
 * full-screen navigation overlay (all breakpoints).
 */
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="header-socials">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
              <SocialIcon name={social.icon} />
            </a>
          ))}
        </div>

        <Logo />

        <div className="header-actions">
          <Link href="/contact" className="btn btn--outline header-cta">
            LET&apos;S TALK
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="menu-grid" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={menuOpen ? "nav-overlay open" : "nav-overlay"}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
        data-lenis-prevent
      >
        <button type="button" className="icon-btn nav-overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
          <Icon name="close" />
        </button>

        <nav aria-label="Main">
          <ul>
            {mainNav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-overlay-footer">
          <a href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
          <a href={contactInfo.phoneHref}>
            {contactInfo.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
