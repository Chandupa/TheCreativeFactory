import { siteConfig } from "@/data/site";
import { getPublishedArticles, journalPath } from "@/lib/journal/content";
import { toRfc822 } from "@/lib/journal/time";
import { absoluteUrl } from "@/lib/seo";
import { xmlEscape, xmlResponse } from "@/lib/xml";

// The 30 most recent published articles. Drafts and future scheduled articles
// are filtered out by getPublishedArticles().
export const revalidate = 300;

export async function GET() {
  const articles = (await getPublishedArticles()).slice(0, 30);
  const self = absoluteUrl("/journal/rss.xml");

  const items = articles
    .map((article) => {
      const url = absoluteUrl(journalPath(article.slug));
      return `    <item>
      <title>${xmlEscape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(article.publishedAt)}</pubDate>
      <dc:creator>${xmlEscape(article.author.name)}</dc:creator>
      <category>${xmlEscape(article.category.name)}</category>
      <description>${xmlEscape(article.excerpt)}</description>
      <media:content url="${xmlEscape(absoluteUrl(article.featuredImage))}" medium="image" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>TCF Journal</title>
    <link>${absoluteUrl("/journal")}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>Articles, news and guides on creativity, design, AI, technology, marketing and business from ${xmlEscape(siteConfig.name)}.</description>
    <language>en</language>${articles.length ? `\n    <lastBuildDate>${toRfc822(articles[0].updatedAt ?? articles[0].publishedAt)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;
  return xmlResponse(xml, "application/rss+xml; charset=utf-8");
}
