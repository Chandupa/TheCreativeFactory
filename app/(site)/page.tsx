import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import Services from "@/components/home/Services";
import Clients from "@/components/home/Clients";
import Reviews from "@/components/home/Reviews";
import CTA from "@/components/home/CTA";
import JsonLd from "@/components/seo/JsonLd";
import { services, toSummary, typingPhrase } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Creative Agency & Production Studio Sri Lanka | The Creative Factory",
  absoluteTitle: true,
  description:
    "Sri Lankan creative agency and production studio: design, animation, film, videography, photography, post production, games, SEO and performance marketing.",
  path: "/",
});

const serviceSummaries = services.map(toSummary);
const phrases = services.map(typingPhrase);

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(services.map((s) => s.name)), websiteSchema()]} />
      <Hero phrases={phrases} />
      <AboutIntro />
      <Services services={serviceSummaries} />
      <Clients />
      <Reviews />
      <CTA />
    </>
  );
}
