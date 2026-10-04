import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

interface CTAAction {
  label: string;
  href: string;
}

interface CTAProps {
  label?: string;
  title?: string;
  accent?: string;
  primary?: CTAAction;
  secondary?: CTAAction;
}

/** Closing call to action — the heading rises line by line from behind a mask. Defaults are the homepage copy. */
export default function CTA({
  label = "LET'S WORK TOGETHER",
  title = "READY TO BUILD YOUR BRAND?",
  accent = "JOIN US TODAY",
  primary = { label: "START A PROJECT", href: "/contact" },
  secondary = { label: "SEE OUR WORK", href: "/work" },
}: CTAProps) {
  return (
    <section className="section cta-section">
      <div className="panel cta-panel" data-depth={40}>
        <div className="cta-glow cta-glow--a" aria-hidden="true" />
        <div className="cta-glow cta-glow--b" aria-hidden="true" />
        <SectionLabel center>{label}</SectionLabel>
        <RevealText display>
          {title}{" "}
          <br />
          <span className="accent">{accent}</span>
        </RevealText>
        <RevealGroup variant="button" className="hero-actions hero-actions--center">
          <Link href={primary.href} className="btn btn--primary">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn btn--outline">
            {secondary.label}
          </Link>
        </RevealGroup>
      </div>
    </section>
  );
}
