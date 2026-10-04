import { LatestListing, latestMetadata, resolveNumberedPage } from "@/components/journal/listingRoutes";
import { latestPath } from "@/lib/journal/content";

export const revalidate = 300;

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props) {
  return latestMetadata(resolveNumberedPage((await params).page, latestPath()));
}

export default async function LatestNumberedPage({ params }: Props) {
  return <LatestListing pageNumber={resolveNumberedPage((await params).page, latestPath())} />;
}
