import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { dmca, siteConfig } from "@/data/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

// Site-wide defaults. Every indexable page overrides title, description,
// canonical, openGraph and twitter through buildMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Creative Agency & Production Studio, Sri Lanka`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
  },
  other: {
    "dmca-site-verification": dmca.verification,
    // Google AdSense site ownership verification (ads run only on /journal; see lib/journal/ads.ts).
    "google-adsense-account": "ca-pub-6750982414798216",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0e13",
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
