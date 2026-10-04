import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Dev only: the Journal CMS (Keystatic) runs on http://127.0.0.1:3000/keystatic
  // and its GitHub setup flow redirects there, so allow that origin in `next dev`.
  allowedDevOrigins: ["127.0.0.1"],
  // Explicit (this is Next's default): /about/ → /about with a 308, so every
  // page has exactly one URL.
  trailingSlash: false,
  // Journal content is read from the repo at request time too (scheduled
  // articles, search), so ship it with the serverless functions.
  outputFileTracingIncludes: {
    "/journal/**": ["./content/journal/**/*", "./public/media/journal/**/*"],
    "/services/**": ["./content/journal/**/*"],
    "/sitemap-journal.xml": ["./content/journal/**/*"],
    "/sitemap.xml": ["./content/journal/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // URLs from the legacy static site, which may still be indexed or linked.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/copyright.html", destination: "/copyright", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/test.html", destination: "/", permanent: true },
      // /insights (never published, always noindexed) was replaced by TCF Journal.
      { source: "/insights", destination: "/journal", permanent: true },
      { source: "/insights/:slug", destination: "/journal/:slug", permanent: true },
      // Canonical host is the bare domain. www has no DNS record today; this
      // only takes effect if www is ever pointed at the project.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thecreativefactory.lk" }],
        destination: "https://thecreativefactory.lk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
