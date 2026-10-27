import { Chakra_Petch, Days_One, IBM_Plex_Mono, Inter_Tight, Source_Serif_4 } from "next/font/google";

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
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-chakra",
});

/** TCF Journal headlines: a heavy, tight grotesk for the editorial look. */
export const journalDisplayFont = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-journal-display",
});

/** TCF Journal rubrics, bylines and navigation. */
export const journalMonoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-journal-mono",
});

/** TCF Journal long-form reading text. */
export const journalSerifFont = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-journal-serif",
});
