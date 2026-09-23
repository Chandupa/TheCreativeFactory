import type { ReactNode } from "react";
import heroBackground from "@/public/images/image.jpeg";
import BackgroundImage from "@/components/effects/BackgroundImage";
import CustomCursor from "@/components/effects/CustomCursor";
import LoadingScreen from "@/components/effects/LoadingScreen";
import ParticleBackground from "@/components/effects/ParticleBackground";
import Footer from "./Footer";
import Header from "./Header";

/**
 * Shared shell for the main site pages (home, work, services, contact,
 * copyright) — the chrome that every legacy page repeated inline. Because it
 * lives in a layout, the particles and cursor persist across navigations.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <LoadingScreen />
      <CustomCursor variant="site" />
      <ParticleBackground minSize={0.1} />
      <BackgroundImage src={heroBackground} className="image-background" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
