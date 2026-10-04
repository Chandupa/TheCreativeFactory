import type { Metadata } from "next";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { services } from "@/data/services";
import { Reveal, RevealText } from "@/components/motion/Reveal";

// Overrides the root layout's "index, follow" so it can't sit next to the
// noindex tag Next.js adds to not-found responses.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <RevealText as="h1" display>
            Page Not Found
          </RevealText>
          <Reveal as="p" variant="copy">
            The page you are looking for does not exist.
          </Reveal>
        </div>
        <Reveal className="page-card">
          <h2>Try one of these</h2>
          <ul className="tag-list">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <Link href="/" className="btn btn--primary">
            BACK TO HOME
          </Link>
        </Reveal>
      </div>
    </MainLayout>
  );
}
