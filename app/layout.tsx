import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { dmca } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TheCreativeFactory",
    template: "%s - TheCreativeFactory",
  },
  description:
    "At The Creative Factory, we believe in the transformative power of storytelling and innovation. Film Production, Post Production, Animation, Design and Game Development.",
  other: {
    "dmca-site-verification": dmca.verification,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
      {/* Loaded once for the whole app; GA4 records client-side route changes itself. */}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
