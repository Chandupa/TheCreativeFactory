import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import Services from "@/components/home/Services";
import Clients from "@/components/home/Clients";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Services />
      <Clients />
      <CTA />
    </>
  );
}
