import { Chakra_Petch, Days_One } from "next/font/google";

/** Display face: headings, stats, logo. */
export const displayFont = Days_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-days-one",
});

/** Body face: copy, labels, buttons. */
export const bodyFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-chakra",
});
