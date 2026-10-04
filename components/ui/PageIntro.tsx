import type { ReactNode } from "react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import SectionLabel from "./SectionLabel";
import { Reveal, RevealGroup, RevealImage, RevealText } from "@/components/motion/Reveal";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  /** Lead paragraphs under the H1. */
  lead?: ReactNode;
  actions?: ReactNode;
  /** Breadcrumb trail without "Home". Omit on top-level pages. */
  breadcrumbs?: Crumb[];
  /** Optional media column (e.g. a cover image). */
  aside?: ReactNode;
}

/**
 * Opening block for inner pages: breadcrumbs, eyebrow, the page's single H1
 * and its lead copy — on the same glow/overlay treatment as the homepage hero.
 */
export default function PageIntro({ eyebrow, title, lead, actions, breadcrumbs, aside }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="hero-overlay" aria-hidden="true" />
      <div className={aside ? "container page-intro-inner page-intro-inner--split" : "container page-intro-inner"}>
        <div>
          {breadcrumbs ? (
            <Reveal variant="fade">
              <Breadcrumbs items={breadcrumbs} />
            </Reveal>
          ) : null}
          <SectionLabel>{eyebrow}</SectionLabel>
          <RevealText as="h1" display className="page-intro-title">
            {title}
          </RevealText>
          {lead ? (
            <Reveal variant="copy" className="page-intro-lead">
              {lead}
            </Reveal>
          ) : null}
          {actions ? (
            <RevealGroup variant="button" className="hero-actions">
              {actions}
            </RevealGroup>
          ) : null}
        </div>
        {aside ? <RevealImage className="page-intro-aside">{aside}</RevealImage> : null}
      </div>
    </header>
  );
}
