import { journalSitemap } from "@/lib/sitemaps";
import { urlsetXml, xmlResponse } from "@/lib/xml";

export const revalidate = 300;

export async function GET() {
  const urls = await journalSitemap();
  // A <urlset> must contain at least one <url>; until the first article, this sitemap doesn't exist.
  if (!urls.length) return new Response("Not found", { status: 404 });
  return xmlResponse(urlsetXml(urls));
}
