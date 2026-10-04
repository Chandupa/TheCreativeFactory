import type { ComponentType } from "react";
import type { ProjectImage } from "./project";

export interface InsightMeta {
  slug: string;
  /** H1 and <title> (brand suffix is added automatically). */
  title: string;
  /** Meta description and listing teaser, 140–160 characters. */
  description: string;
  /** ISO 8601 date, e.g. "2026-10-14". */
  publishedAt: string;
  /** ISO 8601 date of the last meaningful edit. */
  updatedAt?: string;
  author: string;
  /** Service slugs this article supports — rendered as contextual links. */
  services: string[];
  /** Project slugs to feature as examples. */
  projects?: string[];
  cover?: ProjectImage;
  /** Drafts never render in production and never enter the sitemap. */
  published: boolean;
}

export interface Insight extends InsightMeta {
  /** Article body. Start sections at <h2>; the page renders the <h1>. */
  Body: ComponentType;
}
