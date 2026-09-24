import type { SocialLink } from "@/data/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

const icons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export default function SocialIcon({ name, className }: { name: SocialLink["icon"]; className?: string }) {
  const Svg = icons[name];
  return <Svg className={className} width={18} height={18} />;
}
