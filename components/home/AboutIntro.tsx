import Image from "next/image";
import Link from "next/link";
import portrait from "@/public/images/chandupa.jpg";
import SectionLabel from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealImage, RevealText } from "@/components/motion/Reveal";

/** Homepage "about" block, built from the existing About page copy. */
export default function AboutIntro() {
  return (
    <section className="section about-intro">
      <div className="container about-intro-grid">
        <RevealImage className="about-visual">
          <Image
            src={portrait}
            alt="Chandupa Weerakkody, Founder, CEO and Lead Designer"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="about-visual-img"
          />
          <div className="about-visual-badge">
            <strong>CHANDUPA WEERAKKODY</strong>
            <span>FOUNDER · LEAD DESIGNER</span>
          </div>
        </RevealImage>

        <div className="about-copy">
          <SectionLabel>ABOUT THE CREATIVE FACTORY</SectionLabel>
          <RevealText className="section-title">
            A COLOMBO-BASED <span className="accent">CREATIVE AGENCY</span> BUILT ON STORYTELLING
          </RevealText>
          <Reveal as="p" variant="copy">
            Founded by Chandupa Weerakkody, The Creative Factory combines artistic vision with strategic leadership to
            drive brand growth and originality.
          </Reveal>
          <Reveal as="blockquote" variant="copy" className="about-quote">
            &ldquo;See the unseen, tell the untold&rdquo;
          </Reveal>
          <RevealGroup variant="button" className="hero-actions">
            <Link href="/about" className="btn btn--primary">
              KNOW MORE ABOUT US
            </Link>
            <Link href="/work" className="btn btn--outline">
              VIEW OUR WORK
            </Link>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
