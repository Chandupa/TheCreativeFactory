import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Explicit (this is Next's default): /about/ → /about with a 308, so every
  // page has exactly one URL.
  trailingSlash: false,
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
