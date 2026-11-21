import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/public-site";
import { publicDocuments } from "@/lib/public-documents";
import { publicMetadata } from "@/lib/seo";

type Params = { params: Promise<{ document: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(publicDocuments).map((document) => ({ document }));
}
function getDocument(name: string) {
  if (!Object.hasOwn(publicDocuments, name)) notFound();
  return publicDocuments[name as keyof typeof publicDocuments];
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { document: name } = await params;
  const document = getDocument(name);
  return publicMetadata({
    title: document.title,
    description: document.description,
    path: `/${name}`,
  });
}
export default async function Document({ params }: Params) {
  const { document: name } = await params;
  const document = getDocument(name);
  return (
    <PolicyPage
      title={document.title}
      description={document.description}
      sections={document.sections}
      updated={name === "delete-account" ? undefined : "18 November 2026"}
    />
  );
}
