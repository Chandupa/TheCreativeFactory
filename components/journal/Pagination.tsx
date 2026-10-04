import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Builds the URL for a page number (page 1 is the unnumbered base URL). */
  href: (page: number) => string;
}

/** Plain crawlable links (no "load more" JS), so every older article is reachable. */
export default function Pagination({ page, totalPages, href }: PaginationProps) {
  if (totalPages <= 1) return null;

  // First, last, and a window around the current page.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 2,
  );

  return (
    <nav className="journal-pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="journal-pagination-step">
          ← Newer
        </Link>
      ) : null}
      <ol>
        {pages.map((n, i) => (
          <li key={n}>
            {i > 0 && n - pages[i - 1] > 1 ? <span className="journal-pagination-gap">…</span> : null}
            {n === page ? (
              <span aria-current="page">{n}</span>
            ) : (
              <Link href={href(n)} aria-label={`Page ${n}`}>
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className="journal-pagination-step">
          Older →
        </Link>
      ) : null}
    </nav>
  );
}
