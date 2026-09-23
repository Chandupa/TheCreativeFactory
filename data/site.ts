export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "OUR WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT US", href: "/contact" },
];

export const footerLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Copyright", href: "/copyright" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

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
