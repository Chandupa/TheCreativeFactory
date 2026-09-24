import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <div className="page-card">
          <Link href="/" className="btn btn--primary">
            BACK TO HOME
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
