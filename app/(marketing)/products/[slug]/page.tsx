import { notFound } from "next/navigation";

import { DetailPageView } from "@/components/marketing/detail-page";
import { getPageMetadata, productPages } from "@/lib/seo-pages";

export function generateStaticParams() {
  return productPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = productPages.find((item) => item.slug === slug);
  if (!page) return {};
  return getPageMetadata(page, "products");
}

export default async function ProductDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = productPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="Product" />;
}
