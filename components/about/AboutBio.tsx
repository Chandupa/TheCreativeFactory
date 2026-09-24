import SectionLabel from "@/components/ui/SectionLabel";

export default function AboutBio() {
  return (
    <section className="section">
      <div className="panel bio-panel">
        <div>
          <SectionLabel>ABOUT</SectionLabel>
          <h2 className="section-title">
            SEE THE UNSEEN, <br />
            <span className="accent">TELL THE UNTOLD</span>
          </h2>
        </div>
        <div className="bio-copy">
          <p>
            Chandupa Weerakkody is the Founder, CEO, and Lead Designer of The Creative Factory, a Colombo-based creative
            agency known for its innovative and impactful designs. Starting his creative journey at age 12, Chandupa
            combines artistic vision with strategic leadership to drive brand growth and originality.
          </p>
          <p className="bio-emphasis">
            Guided by his philosophy, &ldquo;See the unseen, tell the untold,&rdquo; he continues to shape The Creative
            Factory into a leader in modern creative solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
