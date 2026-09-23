import { dmca } from "@/data/site";

interface DmcaBadgeProps {
  size?: "small" | "large";
}

/** DMCA.com protection badge. Plain <img>: it's a remote, tiny, fixed-size badge. */
export default function DmcaBadge({ size = "small" }: DmcaBadgeProps) {
  return (
    <a href={dmca.statusUrl} title="DMCA.com Protection Status" className="dmca-badge">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={size === "small" ? dmca.badgeSmall : dmca.badgeLarge} alt="DMCA.com Protection Status" />
    </a>
  );
}
