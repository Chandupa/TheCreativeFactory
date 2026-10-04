import { CategoryListing, categoryMetadata, resolveNumberedPage } from "@/components/journal/listingRoutes";
import { categoryPath } from "@/lib/journal/content";

export const revalidate = 300;

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, page } = await params;
  return categoryMetadata(category, resolveNumberedPage(page, categoryPath(category)));
}

export default async function CategoryNumberedPage({ params }: Props) {
  const { category, page } = await params;
  return <CategoryListing slug={category} pageNumber={resolveNumberedPage(page, categoryPath(category))} />;
}
