import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { getLegalDocument, legalDocuments } from "@/lib/legal";
import "./legal.css";

// Slugs match kaanf/crew-policy exactly, so links already pointing at those
// paths keep resolving once this domain serves them.
export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocuments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = legalDocuments.find((d) => d.slug === slug);
  if (!meta) return {};
  return { title: `Crew ${meta.title}`, description: meta.description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!legalDocuments.some((d) => d.slug === slug)) notFound();
  return <LegalPage document={getLegalDocument(slug)} />;
}
