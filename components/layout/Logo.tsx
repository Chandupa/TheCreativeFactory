import Link from "next/link";

/** Text wordmark (no logo artwork exists yet). */
export default function Logo({ className = "logo" }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="The Creative Factory home">
      <span>
        THE<span className="accent">CREATIVE</span>FACTORY
      </span>
      <small>ESTD 2019</small>
    </Link>
  );
}
