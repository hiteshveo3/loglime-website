import { notFound } from "next/navigation";

import { DetailPageView } from "@/components/marketing/detail-page";
import { getPageMetadata, solutionPages } from "@/lib/seo-pages";

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = solutionPages.find((item) => item.slug === params.slug);
  if (!page) return {};
  return getPageMetadata(page, "solutions");
}

export default function SolutionDetailRoute({ params }: { params: { slug: string } }) {
  const page = solutionPages.find((item) => item.slug === params.slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="Solution" />;
}
