import Image from "next/image";
import Link from "next/link";
import portrait from "@/public/images/chandupa.jpg";
import SectionLabel from "@/components/ui/SectionLabel";

/** Homepage "about" block, built from the existing About page copy. */
export default function AboutIntro() {
  return (
    <section className="section about-intro">
      <div className="container about-intro-grid">
        <div className="about-visual">
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
        </div>

        <div className="about-copy">
          <SectionLabel>ABOUT THE CREATIVE FACTORY</SectionLabel>
          <h2 className="section-title">
            A COLOMBO-BASED <span className="accent">CREATIVE AGENCY</span> BUILT ON STORYTELLING
          </h2>
          <p>
            Founded by Chandupa Weerakkody, The Creative Factory combines artistic vision with strategic leadership to
            drive brand growth and originality.
          </p>
          <blockquote className="about-quote">&ldquo;See the unseen, tell the untold&rdquo;</blockquote>
          <div className="hero-actions">
            <Link href="/about" className="btn btn--primary">
              KNOW MORE ABOUT US
            </Link>
            <Link href="/work" className="btn btn--outline">
              VIEW OUR WORK
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
