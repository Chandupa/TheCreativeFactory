import type { Node } from "@markdoc/markdoc";

/** Plain text of a Markdoc document (for search, word counts and fallbacks). */
export function plainText(node: Node): string {
  const parts: string[] = [];
  const walk = (n: Node) => {
    if (n.type === "text" && typeof n.attributes.content === "string") parts.push(n.attributes.content);
    if (n.type === "image" && typeof n.attributes.alt === "string") parts.push(n.attributes.alt);
    for (const child of n.children) walk(child);
    if (n.type === "paragraph" || n.type === "heading" || n.type === "item") parts.push("\n");
  };
  walk(node);
  return parts.join(" ").replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes at ~220 words per minute, never less than 1. */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 220));
}

/** URL-safe id for a heading: "What AI Can't Do (Yet)" → "what-ai-cant-do-yet". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
