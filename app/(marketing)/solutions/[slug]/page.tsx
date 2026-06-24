import { notFound } from "next/navigation";

import { DetailPageView } from "@/components/marketing/detail-page";
import { getPageMetadata, solutionPages } from "@/lib/seo-pages";

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = solutionPages.find((item) => item.slug === slug);
  if (!page) return {};
  return getPageMetadata(page, "solutions");
}

export default async function SolutionDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = solutionPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="Solution" />;
}
