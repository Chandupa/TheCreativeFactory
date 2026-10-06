import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { THEME_COLOR, THEME_STORAGE_KEY } from "@/lib/theme";
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
  themeColor: THEME_COLOR.dark,
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Runs before first paint: applies a saved light-mode choice so the page never
// flashes dark first. Dark is the default (no attribute change needed).
const themeScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLOR.light}")}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: data-theme may be changed by themeScript before React hydrates.
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
      {/* Loaded once for the whole app; GA4 records client-side route changes itself. */}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
