"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo, mainNav, socialLinks } from "@/data/site";
import Icon from "@/components/ui/Icon";
import SocialIcon from "@/components/ui/SocialIcon";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

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

  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Return focus to the menu button when the menu is dismissed (not when a link navigates away).
  const returnFocus = useRef(false);

  const closeMenu = () => {
    returnFocus.current = true;
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      if (returnFocus.current) openButtonRef.current?.focus();
      returnFocus.current = false;
      return;
    }

    // Modal dialog behaviour: move focus in, keep Tab inside, Escape closes.
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeMenu();
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
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
          <Link
            href="/journal"
            className="btn btn--outline header-cta header-journal"
            aria-current={pathname === "/journal" || pathname.startsWith("/journal/") ? "page" : undefined}
          >
            TCF JOURNAL
          </Link>
          <Link href="/contact" className="btn btn--outline header-cta header-talk">
            LET&apos;S TALK
          </Link>
          <ThemeToggle />
          <button
            ref={openButtonRef}
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
        ref={menuRef}
        id="site-menu"
        className={menuOpen ? "nav-overlay open" : "nav-overlay"}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
        data-lenis-prevent
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="icon-btn nav-overlay-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
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
