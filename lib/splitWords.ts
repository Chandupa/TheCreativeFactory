export interface WordSplit {
  /** Word elements grouped by rendered line, top to bottom. */
  lines: HTMLElement[][];
  /** Puts the original text nodes back. */
  revert: () => void;
}

/**
 * Wraps every word of `root` in a clipping mask (`.rv-mask > .rv-word`) so it
 * can slide up from behind its own line.
 *
 * Unlike SplitType this only swaps *text nodes* and keeps the originals, so
 * element children React owns (links, accent spans) are never recreated and
 * `revert()` leaves the DOM exactly as React rendered it. Split right before
 * animating and revert right after — line grouping is measured at split time.
 */
export function splitWords(root: HTMLElement): WordSplit {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.data.trim() && !node.parentElement?.closest("svg")) textNodes.push(node);
  }

  const restores: Array<() => void> = [];
  const words: HTMLElement[] = [];

  for (const node of textNodes) {
    const parent = node.parentNode;
    if (!parent) continue;

    const created: Node[] = [];
    for (const part of node.data.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        created.push(document.createTextNode(part));
        continue;
      }
      const mask = document.createElement("span");
      mask.className = "rv-mask";
      const word = document.createElement("span");
      word.className = "rv-word";
      word.textContent = part;
      mask.appendChild(word);
      words.push(word);
      created.push(mask);
    }

    created.forEach((n) => parent.insertBefore(n, node));
    parent.removeChild(node);
    restores.push(() => {
      created[0]?.parentNode?.insertBefore(node, created[0]);
      created.forEach((n) => n.parentNode?.removeChild(n));
    });
  }

  // Group words into rendered lines by their vertical position.
  const lines: HTMLElement[][] = [];
  let lineTop = Number.NEGATIVE_INFINITY;
  for (const word of words) {
    const rect = word.getBoundingClientRect();
    if (Math.abs(rect.top - lineTop) > rect.height / 2) {
      lines.push([]);
      lineTop = rect.top;
    }
    lines[lines.length - 1].push(word);
  }

  return {
    lines,
    revert: () => restores.forEach((restore) => restore()),
  };
}
