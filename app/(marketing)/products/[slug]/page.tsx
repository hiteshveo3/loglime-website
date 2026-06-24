import { notFound } from "next/navigation";

import { DetailPageView } from "@/components/marketing/detail-page";
import { getPageMetadata, productPages } from "@/lib/seo-pages";

export function generateStaticParams() {
  return productPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = productPages.find((item) => item.slug === params.slug);
  if (!page) return {};
  return getPageMetadata(page, "products");
}

export default function ProductDetailRoute({ params }: { params: { slug: string } }) {
  const page = productPages.find((item) => item.slug === params.slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="Product" />;
}
