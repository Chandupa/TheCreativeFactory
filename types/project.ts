export interface ProjectImage {
  src: string;
  /** Describe what is in the frame, e.g. "Mister Potato pack shot from the product animation". */
  alt: string;
  width: number;
  height: number;
}

export interface ProjectVideo {
  /** Title of the video itself (often the project title). */
  title: string;
  description: string;
  /** Poster frame, shown before playback and used as the VideoObject thumbnail. */
  poster: ProjectImage;
  /** Self-hosted file under /public, e.g. "/videos/mister-potato.mp4". */
  src?: string;
  /** YouTube video ID — rendered as a click-to-load embed. */
  youtubeId?: string;
  /** Vimeo video ID — rendered as a click-to-load embed. */
  vimeoId?: string;
  /** ISO 8601 date the video was first published, e.g. "2024-03-18". Required for VideoObject. */
  uploadDate?: string;
  /** ISO 8601 duration, e.g. "PT0M45S". */
  duration?: string;
}

export interface ProjectResult {
  /** Only verified, client-approved results. */
  label: string;
  value: string;
}

/**
 * A case study at /work/[slug]. Only `slug`, `title`, `year`, `services`,
 * `summary` and `cover` are required; every other section renders only when
 * filled in, so a project can be published with the facts you have and
 * extended later.
 */
export interface Project {
  slug: string;
  title: string;
  /** Leave undefined if the client hasn't approved being named. */
  client?: string;
  year: number;
  /** Service slugs from data/services.ts — drives related links both ways. */
  services: string[];
  /** One or two sentences: used on cards and as the meta description. Aim for 140–160 characters. */
  summary: string;
  cover: ProjectImage;
  /** Unpublished projects are excluded from pages, listings and the sitemap. */
  published: boolean;
  overview?: string[];
  challenge?: string[];
  approach?: string[];
  production?: string[];
  deliverables?: string[];
  video?: ProjectVideo;
  gallery?: ProjectImage[];
  results?: ProjectResult[];
  /** Optional explicit related projects (slugs); otherwise matched by shared services. */
  related?: string[];
}
