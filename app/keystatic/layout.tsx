import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCmsEnabled } from "@/lib/journal/cms";
import KeystaticApp from "./keystatic";

// TCF Journal admin. Outside MainLayout (no site chrome); never indexed.
export const metadata: Metadata = {
  title: "TCF Journal CMS",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!isCmsEnabled()) notFound();
  return <KeystaticApp />;
}
