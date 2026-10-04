import fs from "node:fs";
import path from "node:path";
import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Markdoc, { type Config, type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import { imageSize } from "image-size";
import { siteConfig } from "@/data/site";
import { slugify } from "@/lib/journal/text";
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

function BodyImage({ src, alt = "", title }: { src: string; alt?: string; title?: string }) {
  const size = localImageSize(src);
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

// ---------------------------------------------------------------- body

/**
 * Renders the article body, with optional ad slots after the introduction and
 * mid-way (only in articles long enough to carry them, and only between
 * top-level blocks so ads never split a paragraph, list or quote). AdSlot
 * renders nothing until an ad provider is configured.
 */
export default function ArticleBody({ content }: { content: Node }) {
  const tree = Markdoc.transform(content, config);
  const blocks: RenderableTreeNode[] = Markdoc.Tag.isTag(tree) ? tree.children : [tree];
  const render = (block: RenderableTreeNode, key: number) => (
    <React.Fragment key={key}>{Markdoc.renderers.react(block, React, { components })}</React.Fragment>
  );

  const paragraphIndexes = blocks.flatMap((block, i) => (Markdoc.Tag.isTag(block) && block.name === "p" ? [i] : []));
  const afterIntro = blocks.length >= 6 ? paragraphIndexes[1] : undefined;
  const midPoint = blocks.length >= 14 ? paragraphIndexes.find((i) => i >= blocks.length * 0.55) : undefined;

  return (
    <div className="article-body prose">
      {blocks.map((block, i) => (
        <React.Fragment key={i}>
          {render(block, i)}
          {i === afterIntro ? <AdSlot placement="in-article" /> : null}
          {i === midPoint ? <AdSlot placement="in-article" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
