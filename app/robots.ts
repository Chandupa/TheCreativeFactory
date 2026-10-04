import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Everything public is crawlable, including /_next assets needed for rendering.
// Placeholder pages are kept out of the index with a noindex meta tag instead
// of a Disallow, so crawlers can actually see that directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
