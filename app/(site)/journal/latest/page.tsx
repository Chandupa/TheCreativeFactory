import { LatestListing, latestMetadata } from "@/components/journal/listingRoutes";

export const revalidate = 300;

export function generateMetadata() {
  return latestMetadata(1);
}

export default function LatestPage() {
  return <LatestListing pageNumber={1} />;
}
