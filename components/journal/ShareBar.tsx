"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { XIcon } from "@/components/ui/BrandIcons";
import SocialIcon from "@/components/ui/SocialIcon";

const noopSubscribe = () => () => {};

interface ShareBarProps {
  url: string;
  title: string;
  slug: string;
}

/** Share links (no third-party scripts), copy-link, and the native share sheet where supported. */
export default function ShareBar({ url, title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  // False on the server and during hydration, then the real capability — no mismatch.
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const track = (method: string) => trackEvent("share", { method, content_type: "article", item_id: slug });

  const networks = [
    { method: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <SocialIcon name="linkedin" /> },
    { method: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <SocialIcon name="facebook" /> },
    { method: "x", label: "X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`, icon: <XIcon width={18} height={18} /> },
    { method: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, icon: <MessageCircle width={18} height={18} aria-hidden="true" /> },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: nothing sensible to do silently.
    }
  };

  return (
    <div className="share-bar">
      <span className="share-bar-label">Share</span>
      <ul>
        {networks.map((network) => (
          <li key={network.method}>
            <a
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${network.label}`}
              onClick={() => track(network.method)}
            >
              {network.icon}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}>
            {copied ? <Check width={18} height={18} /> : <Link2 width={18} height={18} />}
          </button>
        </li>
        {canNativeShare ? (
          <li>
            <button
              type="button"
              aria-label="More sharing options"
              onClick={() => navigator.share({ title, url }).then(() => track("native")).catch(() => {})}
            >
              <Share2 width={18} height={18} />
            </button>
          </li>
        ) : null}
      </ul>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
