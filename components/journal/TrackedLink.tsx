"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** GA4 `cta_click` params. */
  cta: string;
  articleSlug?: string;
};

/** next/link that records a `cta_click` event (e.g. Journal → service page). */
export default function TrackedLink({ cta, articleSlug, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent("cta_click", { cta, destination: String(props.href), article_slug: articleSlug });
        onClick?.(event);
      }}
    />
  );
}
