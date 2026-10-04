import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only. Import gsap/ScrollTrigger from here so every
// consumer gets the registered instance.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // House ease for reveals: a long, soft expo-style settle — cubic-bezier(0.16, 1, 0.3, 1).
  CustomEase.create("reveal", "0.16, 1, 0.3, 1");
}

export { gsap, ScrollTrigger };
