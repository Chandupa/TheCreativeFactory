import type { ReactNode } from "react";
import { bodyFont, displayFont } from "@/lib/fonts";
import CustomCursor from "@/components/effects/CustomCursor";
import LoadingScreen from "@/components/effects/LoadingScreen";
import ParticleBackground from "@/components/effects/ParticleBackground";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import Header from "./Header";

/** Must match --accent in styles/site.css. */
const ACCENT = "#cbfe1c";

/**
 * Shared shell for the main site pages (home, work, services, contact,
 * copyright). Because it lives in a layout, the particles and cursor persist
 * across navigations.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`site ${displayFont.variable} ${bodyFont.variable}`}>
      <LoadingScreen />
      <CustomCursor variant="site" />
      <ParticleBackground color={ACCENT} minSize={0.1} />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
