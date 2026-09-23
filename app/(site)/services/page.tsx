import type { Metadata } from "next";
import Services from "@/components/home/Services";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Services",
};

// The legacy site had no separate services page; this reuses the homepage
// "WHAT WE DO" section and CTA as-is.
export default function ServicesPage() {
  return (
    <div className="header-offset">
      <Services />
      <CTA />
    </div>
  );
}
