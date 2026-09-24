export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "instagram" | "facebook";
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  /** Animate from 0 on scroll-in. Off for years (counting up to "2019" reads oddly). */
  countUp: boolean;
}

export interface HeroMedia {
  /**
   * Background video for the homepage hero, or null for the placeholder.
   * Drop the file in /public/videos (e.g. /public/videos/hero.mp4) and set
   * "/videos/hero.mp4" here. Use a muted H.264 MP4, ~1920×1080, ideally < 10 MB.
   */
  video: string | null;
  /** Shown while the video loads, when it is missing, and for reduced motion. */
  poster: string;
}

export const mainNav: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "OUR WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT US", href: "/contact" },
];

export const footerLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Copyright", href: "/copyright" },
];

// From the legacy About page (Twitter pointed at twitter.com itself, so it's omitted).
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chandupa-weerakkody", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/chandupa.mp4", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61556727893743", icon: "facebook" },
];

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects", countUp: true },
  { value: 20, suffix: "+", label: "Clients", countUp: true },
  { value: 2019, label: "Established", countUp: false },
];

export const heroMedia: HeroMedia = {
  video: null,
  poster: "/images/image.jpeg",
};

export const contactInfo = {
  company: "The Creative Factory",
  address: "Mawathgama, Homagama, Sri Lanka",
  email: "chandupaweerakkody@gmail.com",
  phoneDisplay: "+94 71-305-7840",
  phoneHref: "tel:+94713057840",
} as const;

export const dmca = {
  verification: "MlpCQmNLZTBPdTVSOStpMXowWmtJK3hBLzRiVFA3bTEvS2U3d0l5VWlIdz01",
  statusUrl: "//www.dmca.com/Protection/Status.aspx?ID=5de43477-2f37-4eb9-9102-20629aaed71f",
  badgeSmall:
    "https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=5de43477-2f37-4eb9-9102-20629aaed71f",
  badgeLarge:
    "https://images.dmca.com/Badges/dmca-badge-w200-5x1-10.png?ID=5de43477-2f37-4eb9-9102-20629aaed71f",
  helperScript: "https://images.dmca.com/Badges/DMCABadgeHelper.min.js",
} as const;
