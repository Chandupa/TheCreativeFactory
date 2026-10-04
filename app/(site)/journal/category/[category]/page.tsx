import { CategoryListing, categoryMetadata } from "@/components/journal/listingRoutes";
import { getCategories } from "@/lib/journal/content";

export const revalidate = 300;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  return categoryMetadata((await params).category, 1);
}

export default async function CategoryPage({ params }: Props) {
  return <CategoryListing slug={(await params).category} pageNumber={1} />;
}
