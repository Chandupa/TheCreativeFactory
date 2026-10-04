import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Everything public is crawlable, including /_next assets needed for rendering.
// Placeholder pages are kept out of the index with a noindex meta tag instead
// of a Disallow, so crawlers can actually see that directive. Only the Journal
// CMS (admin UI and its API) is disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
