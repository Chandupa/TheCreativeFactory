import type { ComponentPropsWithoutRef, ElementType } from "react";

/*
 * Declarative scroll-reveal markers. These render plain elements with
 * data-attributes and no client JS of their own; <ScrollReveal> (mounted once
 * in MainLayout) finds them and runs the animations. Because the HTML is fully
 * visible as rendered, content still shows if JavaScript never runs — and
 * reduced-motion visitors simply see it straight away.
 *
 * Every component takes `as` to render the element you would have written
 * anyway (h2, ul, article…), so wrapping adds no extra DOM:
 *
 *   <RevealText as="h2" className="section-title">…</RevealText>
 *   <RevealGroup as="ul" className="detail-grid" variant="card">…</RevealGroup>
 */

/** How an element enters. Strongest to subtlest: display › heading › project/image › card › up › copy › button › fade. */
export type RevealVariant =
  | "up" // standard block: 56px rise + fade
  | "card" // grid tiles: 60px rise + fade
  | "copy" // body text: 20px rise + fade
  | "button" // buttons: 15px rise + fade
  | "fade" // small labels: 10px rise + fade
  | "heading" // words slide up from behind a line mask, line by line
  | "display" // giant page titles: deeper, slower masked reveal
  | "image" // clip-path uncover + image settling from 1.08 scale
  | "project"; // portfolio card: rise, image settle, masked title, delayed meta

type Polymorphic<T extends ElementType, P> = P & { as?: T } & Omit<ComponentPropsWithoutRef<T>, keyof P | "as">;

type RevealOwnProps = {
  variant?: RevealVariant;
  /** Extra delay in seconds, added to the automatic cascade. */
  delay?: number;
};

/** Reveals one element (and everything inside it) when it scrolls into view. */
export function Reveal<T extends ElementType = "div">({ as, variant = "up", delay, ...rest }: Polymorphic<T, RevealOwnProps>) {
  const Tag: ElementType = as ?? "div";
  return <Tag data-reveal={variant} data-reveal-delay={delay} {...rest} />;
}

/** Masked, line-by-line heading reveal. `display` for oversized page titles. */
export function RevealText<T extends ElementType = "h2">({
  as,
  display = false,
  delay,
  ...rest
}: Polymorphic<T, { display?: boolean; delay?: number }>) {
  const Tag: ElementType = as ?? "h2";
  return <Tag data-reveal={display ? "display" : "heading"} data-reveal-delay={delay} {...rest} />;
}

/** Image/media container that is uncovered from the bottom while its image settles. */
export function RevealImage<T extends ElementType = "div">({ as, delay, ...rest }: Polymorphic<T, { delay?: number }>) {
  const Tag: ElementType = as ?? "div";
  return <Tag data-reveal="image" data-reveal-delay={delay} {...rest} />;
}

/** Direct children reveal in sequence (80ms apart) as they come into view together. */
export function RevealGroup<T extends ElementType = "div">({
  as,
  variant = "up",
  delay,
  ...rest
}: Polymorphic<T, RevealOwnProps>) {
  const Tag: ElementType = as ?? "div";
  return <Tag data-reveal-group={variant} data-reveal-delay={delay} {...rest} />;
}

/**
 * Drifts the element vertically while its section crosses the viewport.
 * `distance` is the total travel in px (halved on phones). Decorative use only.
 */
export function Parallax<T extends ElementType = "div">({ as, distance = 60, ...rest }: Polymorphic<T, { distance?: number }>) {
  const Tag: ElementType = as ?? "div";
  return <Tag data-parallax={distance} {...rest} />;
}
