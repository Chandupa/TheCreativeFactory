import fs from "node:fs";
import path from "node:path";
import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Markdoc, { type Config, type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import { imageSize } from "image-size";
import { siteConfig } from "@/data/site";
import { AD_PLACEMENT, ARTICLE_SQUARE_SLOT, ARTICLE_TOP_SLOT } from "@/lib/journal/ads";
import { countWords, plainText, slugify } from "@/lib/journal/text";
import AdSlot from "./AdSlot";

// ---------------------------------------------------------------- markdoc config

const config: Config = {
  nodes: {
    // The headline is the page's only H1, so body headings start at H2.
    heading: {
      children: ["inline"],
      attributes: { level: { type: Number, required: true } },
      transform(node, cfg) {
        const children = node.transformChildren(cfg);
        const text = children.filter((child): child is string => typeof child === "string").join(" ");
        const level = Math.min(Math.max(Number(node.attributes.level) || 2, 2), 4);
        return new Markdoc.Tag("Heading", { level, id: slugify(text) }, children);
      },
    },
    // An image on its own line is a block figure; never a <figure> inside <p> (invalid HTML → hydration errors).
    paragraph: {
      transform(node, cfg) {
        const children = node.transformChildren(cfg);
        const visible = children.filter((child) => !(typeof child === "string" && !child.trim()));
        if (visible.length === 1 && Markdoc.Tag.isTag(visible[0]) && visible[0].name === "BodyImage") {
          return new Markdoc.Tag("BodyImage", { ...visible[0].attributes, block: true }, []);
        }
        return new Markdoc.Tag("p", node.transformAttributes(cfg), children);
      },
    },
    image: {
      attributes: { src: { type: String, required: true }, alt: { type: String }, title: { type: String } },
      transform(node) {
        return new Markdoc.Tag("BodyImage", node.attributes, []);
      },
    },
    link: {
      children: ["strong", "em", "s", "code", "text", "tag"],
      attributes: { href: { type: String, required: true }, title: { type: String } },
      transform(node, cfg) {
        return new Markdoc.Tag("BodyLink", node.transformAttributes(cfg), node.transformChildren(cfg));
      },
    },
  },
  tags: {
    embed: {
      render: "Embed",
      selfClosing: true,
      attributes: { url: { type: String, required: true }, caption: { type: String } },
    },
  },
};

// ---------------------------------------------------------------- components

function Heading({ level, id, children }: { level: 2 | 3 | 4; id: string; children: ReactNode }) {
  const Tag = `h${level}` as const;
  return <Tag id={id || undefined}>{children}</Tag>;
}

/** Real width/height for local images, so inline images never shift the layout. */
function localImageSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith("/") || src.startsWith("//")) return null;
  const publicDir = path.join(process.cwd(), "public");
  const file = path.join(publicDir, decodeURIComponent(src.split("?")[0]));
  if (!file.startsWith(publicDir) || !fs.existsSync(file)) return null;
  try {
    const { width, height } = imageSize(fs.readFileSync(file));
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

function BodyImage({ src, alt = "", title, block = false }: { src: string; alt?: string; title?: string; block?: boolean }) {
  const size = localImageSize(src);
  if (!block) {
    // Image mixed into a line of text: stay inline (valid inside <p>).
    return size ? (
      <Image src={src} alt={alt} width={size.width} height={size.height} sizes="(min-width: 800px) 760px, 100vw" className="article-inline-image" />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading="lazy" decoding="async" className="article-inline-image" />
    );
  }
  return (
    <figure className="article-figure">
      {size ? (
        <Image src={src} alt={alt} width={size.width} height={size.height} sizes="(min-width: 800px) 760px, 100vw" />
      ) : (
        // External or unreadable image: plain lazy <img> (next/image needs known dimensions).
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      )}
      {title ? <figcaption>{title}</figcaption> : null}
    </figure>
  );
}

function BodyLink({ href, title, children }: { href: string; title?: string; children: ReactNode }) {
  // Links within the site navigate client-side; everything else opens normally.
  const internal = href.startsWith("/") ? href : href.startsWith(siteConfig.url) ? href.slice(siteConfig.url.length) || "/" : null;
  if (internal !== null && !internal.startsWith("//")) {
    return (
      <Link href={internal} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function embedSrc(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (host === "youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.match(/^\/(\d+)/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}?dnt=1` : null;
    }
  } catch {
    // fall through
  }
  return null;
}

/** YouTube/Vimeo in a fixed 16:9 frame, lazy-loaded; anything else degrades to a link. */
function Embed({ url, caption }: { url: string; caption?: string }) {
  const src = embedSrc(url);
  if (!src) {
    return (
      <p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {caption || url}
        </a>
      </p>
    );
  }
  return (
    <figure className="article-figure">
      <div className="article-embed">
        <iframe
          src={src}
          title={caption || "Embedded video"}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const components = { Heading, BodyImage, BodyLink, Embed };

// ---------------------------------------------------------------- body + ad placement

interface Block {
  node: Node;
  words: number;
  isParagraph: boolean;
  /** An ad may follow this block (it doesn't introduce what comes next). */
  canPrecedeAd: boolean;
}

/**
 * Where the two in-article ads go, as "after block i" indexes. Works on whole
 * top-level blocks (paragraphs, headings, lists, quotes, figures, embeds), so
 * an ad can never land inside one; see AD_PLACEMENT in lib/journal/ads.ts.
 */
export function placeAds(blocks: Block[]): { top?: number; square?: number } {
  const total = blocks.reduce((sum, b) => sum + b.words, 0);
  const before: number[] = [];
  let words = 0;
  let paragraphs = 0;
  const paragraphsBefore: number[] = [];
  blocks.forEach((block, i) => {
    words += block.words;
    if (block.isParagraph) paragraphs += 1;
    before[i] = words;
    paragraphsBefore[i] = paragraphs;
  });
  const valid = (i: number) => i < blocks.length - 1 && blocks[i].canPrecedeAd;

  const nextIsHeading = (i: number) => blocks[i + 1]?.node.type === "heading";
  // First point after the introduction: enough paragraphs and words read — or,
  // at the end of a shorter intro, the natural break before the first section.
  const top = blocks.findIndex(
    (_, i) =>
      valid(i) &&
      paragraphsBefore[i] >= AD_PLACEMENT.TOP_MIN_PARAGRAPHS_BEFORE &&
      (before[i] >= AD_PLACEMENT.TOP_MIN_WORDS_BEFORE ||
        (nextIsHeading(i) && before[i] >= AD_PLACEMENT.TOP_SECTION_BREAK_MIN_WORDS)) &&
      total - before[i] >= AD_PLACEMENT.TOP_MIN_WORDS_AFTER,
  );
  if (top < 0) return {};
  if (total < AD_PLACEMENT.SQUARE_MIN_ARTICLE_WORDS) return { top };

  // Nearest the target point, preferring a section break (the next block is a
  // heading) when one is reasonably close, so the ad doesn't split a section.
  const target = total * AD_PLACEMENT.SQUARE_TARGET_FRACTION;
  const sectionBonus = total * AD_PLACEMENT.SQUARE_SECTION_BREAK_BONUS;
  const cost = (i: number) => Math.abs(before[i] - target) - (nextIsHeading(i) ? sectionBonus : 0);
  let square: number | undefined;
  blocks.forEach((_, i) => {
    if (
      i > top &&
      valid(i) &&
      before[i] - before[top] >= AD_PLACEMENT.SQUARE_MIN_WORDS_AFTER_TOP &&
      total - before[i] >= AD_PLACEMENT.SQUARE_MIN_WORDS_AFTER &&
      (square === undefined || cost(i) < cost(square))
    ) {
      square = i;
    }
  });
  return { top, square };
}

function toBlocks(content: Node): Block[] {
  return content.children.map((node) => {
    const text = plainText(node).trim();
    return {
      node,
      words: countWords(text),
      isParagraph: node.type === "paragraph" && countWords(text) > 0,
      canPrecedeAd: node.type !== "heading" && !text.endsWith(":"),
    };
  });
}

/**
 * Renders the article body and injects the manual AdSense units from the
 * template (never from CMS content): Article Top after the introduction, and
 * Article Square mid-way in longer articles. Changing slots, rules or
 * switching ads off is done centrally in lib/journal/ads.ts.
 */
export default function ArticleBody({ content, articleSlug }: { content: Node; articleSlug: string }) {
  const blocks = toBlocks(content);
  const { top, square } = placeAds(blocks);

  return (
    <div className="article-body prose">
      {blocks.map((block, i) => (
        <React.Fragment key={i}>
          {Markdoc.renderers.react(Markdoc.transform(block.node, config) as RenderableTreeNode, React, { components })}
          {/* Keyed by article so client-side navigation always mounts a fresh unit. */}
          {i === top ? <AdSlot key={`top-${articleSlug}`} slot={ARTICLE_TOP_SLOT} /> : null}
          {i === square ? <AdSlot key={`square-${articleSlug}`} slot={ARTICLE_SQUARE_SLOT} /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
