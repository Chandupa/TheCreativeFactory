"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface JournalNavProps {
  categories: { slug: string; name: string }[];
}

/**
 * Journal section bar under the site header: masthead link, Latest, the
 * categories marked "Show in Journal navigation", and search. On narrow
 * screens the links scroll sideways inside the bar (never the page).
 */
export default function JournalNav({ categories }: JournalNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = [
    { href: "/journal/latest", label: "Latest" },
    ...categories.map((category) => ({ href: `/journal/category/${category.slug}`, label: category.name })),
  ];

  return (
    <nav className="journal-nav" aria-label="Journal">
      <div className="container journal-nav-inner">
        <Link href="/journal" className="journal-nav-brand" aria-current={pathname === "/journal" ? "page" : undefined}>
          TCF <span className="accent">JOURNAL</span>
        </Link>
        <ul className="journal-nav-links" data-lenis-prevent>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/journal/search"
          className="journal-nav-search"
          aria-label="Search the Journal"
          aria-current={isActive("/journal/search") ? "page" : undefined}
        >
          <Search width={18} height={18} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
