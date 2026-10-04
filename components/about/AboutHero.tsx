import Image from "next/image";
import ceoBackground from "@/public/images/ceo_image.jpg";
import portrait from "@/public/images/chandupa.jpg";
import { socialLinks } from "@/data/site";
import BackgroundImage from "@/components/effects/BackgroundImage";
import SectionLabel from "@/components/ui/SectionLabel";
import SocialIcon from "@/components/ui/SocialIcon";
import { Reveal, RevealGroup, RevealImage, RevealText } from "@/components/motion/Reveal";

export default function AboutHero() {
  return (
    <section className="page-hero">
      <BackgroundImage src={ceoBackground} className="page-hero-media" parallax={80} />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <SectionLabel>MEET THE FOUNDER</SectionLabel>
          <RevealText as="h1" display className="page-hero-title">
            CHANDUPA{" "}
            <br />
            <span className="accent">WEERAKKODY</span>
          </RevealText>
          <Reveal as="p" variant="fade" className="page-hero-role">
            CEO &amp; Lead Designer
          </Reveal>

          <Reveal as="blockquote" variant="copy" className="about-quote">
            &ldquo;See the unseen, tell the untold&rdquo;
            <cite>A guiding philosophy for creative excellence</cite>
          </Reveal>

          <RevealGroup variant="button" className="footer-socials">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </RevealGroup>
        </div>

        <RevealImage className="about-visual">
          <Image
            src={portrait}
            alt="Chandupa Weerakkody, CEO and Lead Designer"
            fill
            preload
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="about-visual-img"
          />
          <div className="about-visual-badge">
            <strong>THE CREATIVE FACTORY</strong>
            <span>FOUNDED 2019</span>
          </div>
        </RevealImage>
      </div>
    </section>
  );
}
