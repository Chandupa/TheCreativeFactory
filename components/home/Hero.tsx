import TypingText from "./TypingText";

export default function Hero() {
  return (
    <section className="hero">
      <TypingText />
      <div className="hero-text">
        <p>
          At The Creative Factory, we believe in the transformative power of storytelling and innovation. We specialize
          in crafting compelling narratives and providing cutting-edge solutions to help you stand out.
        </p>
      </div>
      <div className="object-showcase" />
    </section>
  );
}
