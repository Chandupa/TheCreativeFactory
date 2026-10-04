import SectionLabel from "@/components/ui/SectionLabel";
import { RevealGroup, RevealText } from "@/components/motion/Reveal";

export default function AboutBio() {
  return (
    <section className="section section--tight">
      <div className="panel bio-panel" data-depth={40}>
        <div>
          <SectionLabel>ABOUT</SectionLabel>
          <RevealText className="section-title">
            SEE THE UNSEEN, <br />
            <span className="accent">TELL THE UNTOLD</span>
          </RevealText>
        </div>
        <RevealGroup variant="copy" className="bio-copy">
          <p>
            Chandupa Weerakkody is the Founder, CEO, and Lead Designer of The Creative Factory, a Colombo-based creative
            agency known for its innovative and impactful designs. Starting his creative journey at age 12, Chandupa
            combines artistic vision with strategic leadership to drive brand growth and originality.
          </p>
          <p className="bio-emphasis">
            Guided by his philosophy, &ldquo;See the unseen, tell the untold,&rdquo; he continues to shape The Creative
            Factory into a leader in modern creative solutions.
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
