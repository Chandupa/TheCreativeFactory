export type ServiceIcon =
  | "palette"
  | "film"
  | "video"
  | "clapperboard"
  | "camera"
  | "sliders"
  | "gamepad"
  | "searchChart"
  | "chartLine";

export interface ServiceCapability {
  name: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** The small slice of a service that client components (cards, typing line) need. */
export interface ServiceSummary {
  slug: string;
  name: string;
  icon: ServiceIcon;
  description: string;
}

export interface Service extends ServiceSummary {
  /** Hero "WE CREATE …" wording when the name alone doesn't read well (e.g. "SEO STRATEGY"). */
  typingPhrase?: string;
  /** Page H1 — the service's primary search topic, written for people. */
  headline: string;
  /** <title> without the brand suffix. Keep ≤ ~45 chars so the full title fits. */
  metaTitle: string;
  /** 140–160 characters, unique per page. */
  metaDescription: string;
  /** Two or three sentences for the /services hub. */
  summary: string;
  /** Opening paragraphs on the service page. */
  intro: string[];
  capabilities: ServiceCapability[];
  process: ServiceStep[];
  faqs: ServiceFaq[];
  /** Slugs of related services, in display order. */
  related: string[];
  /** CTA panel heading: `title` then `accent` on a second line. */
  cta: { title: string; accent: string };
  /** Optional hero/hub visual. TODO: add real project stills per service. */
  image?: { src: string; alt: string; width: number; height: number };
}
