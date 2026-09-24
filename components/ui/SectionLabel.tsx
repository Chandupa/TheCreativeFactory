import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  /** Centered labels get a rule on both sides. */
  center?: boolean;
}

/** Small accent "eyebrow" above a section heading, e.g. "— WHAT WE DO —". */
export default function SectionLabel({ children, center = false }: SectionLabelProps) {
  return <span className={center ? "eyebrow eyebrow--center" : "eyebrow"}>{children}</span>;
}
