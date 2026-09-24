import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our Work",
};

// The legacy "OUR WORK" link pointed to "#". Projects will be loaded from
// Supabase later; until then this renders whatever is in data/projects.ts.
export default function WorkPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Work</h1>
      </div>

      {projects.length === 0 ? (
        <div className="page-card">
          <h2>Coming Soon</h2>
          <p>Our portfolio is on its way.</p>
          <Link href="/contact" className="btn btn--primary">
            JOIN US TODAY
          </Link>
        </div>
      ) : (
        projects.map((project) => (
          <div className="page-card" key={project.slug}>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <Link href={`/work/${project.slug}`} className="btn btn--primary">
              VIEW PROJECT
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
