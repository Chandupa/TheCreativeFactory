import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import JsonLd from "./JsonLd";

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. Pass the
 * trail without "Home"; it is prepended. The last crumb is the current page.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path}>
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
