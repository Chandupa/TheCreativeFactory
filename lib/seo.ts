import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export interface PageSeo {
  /** Page title without the brand suffix (the root layout's template adds it). */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/animation". Used for the canonical URL. */
  path: string;
  /** Use the title verbatim, without the " | The Creative Factory" suffix. */
  absoluteTitle?: boolean;
  /** Site-relative or absolute image for social cards. Defaults to the generated brand card. */
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Keep the page out of the index (links are still followed). */
  noindex?: boolean;
}

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — creative agency and production studio in Sri Lanka`,
};

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds a page's complete Metadata: title, description, canonical, Open Graph
 * and Twitter card. Next merges metadata shallowly, so every page sets its own
 * `openGraph`/`twitter` objects in full through this helper rather than
 * relying on inheritance from the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [ogImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
