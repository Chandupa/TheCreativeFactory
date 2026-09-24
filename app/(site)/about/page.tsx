import type { Metadata } from "next";
import AboutBio from "@/components/about/AboutBio";
import AboutHero from "@/components/about/AboutHero";
import ContactCards from "@/components/about/ContactCards";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: { absolute: "Chandupa Weerakkody — CEO & Lead Designer" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <ContactCards />
      <CTA />
    </>
  );
}
