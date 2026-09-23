import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ceoBackground from "@/public/images/ceo_image.jpg";
import AboutBio from "@/components/about/AboutBio";
import AboutHero from "@/components/about/AboutHero";
import ContactCards from "@/components/about/ContactCards";
import BackgroundImage from "@/components/effects/BackgroundImage";
import CustomCursor from "@/components/effects/CustomCursor";
import ParticleBackground from "@/components/effects/ParticleBackground";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Chandupa Weerakkody — CEO & Lead Designer" },
};

// Standalone page, as in the legacy site: no shared header/footer, its own
// photo background and cursor style, and the Tailwind-based layout.
export default function AboutPage() {
  return (
    <div className={`about-root ${inter.className}`}>
      <ParticleBackground minSize={0.15} sizeFromDisplaced />
      <BackgroundImage src={ceoBackground} className="about-image-background" />
      <CustomCursor variant="about" />

      {/* Soft animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 z-10">
        <AboutHero />
        <AboutBio />
        <ContactCards />
      </main>
    </div>
  );
}
