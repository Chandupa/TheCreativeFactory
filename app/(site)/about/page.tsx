import AboutBio from "@/components/about/AboutBio";
import AboutHero from "@/components/about/AboutHero";
import AboutStudio from "@/components/about/AboutStudio";
import ContactCards from "@/components/about/ContactCards";
import CTA from "@/components/home/CTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { founderSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "About Us & Founder Chandupa Weerakkody",
  description:
    "Meet The Creative Factory, a Sri Lankan creative agency and production studio founded in 2019, and its founder, CEO and lead designer Chandupa Weerakkody.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={founderSchema()} />
      <AboutHero />
      <AboutStudio />
      <AboutBio />
      <ContactCards />
      <CTA secondary={{ label: "OUR SERVICES", href: "/services" }} />
    </>
  );
}
