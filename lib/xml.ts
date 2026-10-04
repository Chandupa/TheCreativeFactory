/** Escapes text for XML element content and attribute values. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface SitemapUrl {
  loc: string;
  /** Only when a real modification date exists — never a build timestamp. */
  lastmod?: string;
}

export function urlsetXml(urls: SitemapUrl[]): string {
  const body = urls
    .map(({ loc, lastmod }) => `<url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndexXml(sitemaps: SitemapUrl[]): string {
  const body = sitemaps
    .map(({ loc, lastmod }) => `<sitemap><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function xmlResponse(xml: string, contentType = "application/xml; charset=utf-8"): Response {
  return new Response(xml, { headers: { "Content-Type": contentType } });
}
