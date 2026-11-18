import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/public-site";
import { publicDocuments } from "@/lib/public-documents";

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
  const document = getDocument((await params).document);
  return { title: document.title, description: document.description };
}
export default async function Document({ params }: Params) {
  const document = getDocument((await params).document);
  return (
    <PolicyPage title={document.title} description={document.description}>
      {document.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.body}
        </section>
      ))}
    </PolicyPage>
  );
}
