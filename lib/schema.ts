import { contactInfo, founder, organizationProfiles, siteConfig, socialLinks } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/*
 * JSON-LD builders. Every value comes from the data files — nothing here is
 * invented. Entities reference each other by @id so the Organization is
 * described once (homepage) and linked from everywhere else.
 */

type JsonLd = Record<string, unknown>;

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;
export const FOUNDER_ID = `${siteConfig.url}/about#founder`;

export const organizationRef = { "@id": ORGANIZATION_ID };

export function organizationSchema(knowsAbout: string[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    foundingDate: String(siteConfig.foundingYear),
    founder: { "@id": FOUNDER_ID },
    email: contactInfo.email,
    telephone: contactInfo.phoneE164,
    address: { "@type": "PostalAddress", ...contactInfo.addressParts },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    knowsAbout,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactInfo.email,
      telephone: contactInfo.phoneE164,
      areaServed: "LK",
    },
    // TODO: add `logo` (≥112×112 raster) once real logo artwork exists.
    ...(organizationProfiles.length ? { sameAs: organizationProfiles } : {}),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    publisher: organizationRef,
  };
}

export function founderSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    jobTitle: founder.jobTitle,
    image: absoluteUrl(founder.image),
    worksFor: organizationRef,
    sameAs: socialLinks.map((link) => link.href),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(service: { name: string; headline: string; metaDescription: string; path: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.headline,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(service.path),
    provider: organizationRef,
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export interface VideoSchemaInput {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}

/**
 * VideoObject is only valid with a name, description, thumbnail and upload
 * date plus a content or embed URL. Returns null otherwise, so callers can't
 * emit half-filled video markup.
 */
export function videoObjectSchema(video: VideoSchemaInput): JsonLd | null {
  if (!video.thumbnailUrl || !video.uploadDate || !(video.contentUrl || video.embedUrl)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: absoluteUrl(video.thumbnailUrl),
    uploadDate: video.uploadDate,
    ...(video.contentUrl ? { contentUrl: absoluteUrl(video.contentUrl) } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.duration ? { duration: video.duration } : {}),
    publisher: organizationRef,
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author:
      article.authorName === founder.name
        ? { "@type": "Person", "@id": FOUNDER_ID, name: founder.name }
        : { "@type": "Person", name: article.authorName },
    publisher: organizationRef,
    ...(article.image ? { image: absoluteUrl(article.image) } : {}),
  };
}

export function creativeWorkSchema(project: {
  title: string;
  description: string;
  path: string;
  year: number;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(project.path),
    dateCreated: String(project.year),
    creator: organizationRef,
    ...(project.image ? { image: absoluteUrl(project.image) } : {}),
  };
}
