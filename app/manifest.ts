import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Creative Factory",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0e13",
    theme_color: "#0b0e13",
    // TODO: add 192×192 and 512×512 PNGs of the logo mark (only a 32×32 favicon exists today).
    icons: [{ src: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
  };
}
