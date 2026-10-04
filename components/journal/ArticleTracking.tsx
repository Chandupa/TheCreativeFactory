"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Sends one `article_view` per article page view, with the dimensions page_view lacks. */
export default function ArticleTracking({
  slug,
  category,
  author,
  type,
}: {
  slug: string;
  category: string;
  author: string;
  type: string;
}) {
  useEffect(() => {
    trackEvent("article_view", { article_slug: slug, article_category: category, article_author: author, article_type: type });
  }, [slug, category, author, type]);

  return null;
}
