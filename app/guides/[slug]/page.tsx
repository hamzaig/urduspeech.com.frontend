import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro } from "@/components/marketing";
import { PublicPage, ReadingSections } from "@/components/public-site";
import { publicGuides } from "@/lib/public-guides";

type GuideParams = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicGuides.map(({ slug }) => ({ slug }));
}

async function getGuide(params: GuideParams["params"]) {
  const { slug } = await params;
  const guide = publicGuides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({
  params,
}: GuideParams): Promise<Metadata> {
  const guide = await getGuide(params);
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `https://urduspeech.com/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: GuideParams) {
  const guide = await getGuide(params);
  return (
    <PublicPage mainClassName="public-container marketing-page guide-article">
      <Link className="guide-back" href="/guides">
        <ArrowLeft size={17} aria-hidden="true" /> Creator guides
      </Link>
      <article>
        <MarketingIntro title={guide.title}>
          <p>{guide.summary}</p>
        </MarketingIntro>
        <ReadingSections sections={guide.sections} />
      </article>
      <section
        className="product-section guide-related"
        aria-labelledby="guide-related"
      >
        <h2 id="guide-related">More creator guides</h2>
        <GuideCards
          guides={publicGuides.filter(({ slug }) => slug !== guide.slug)}
        />
      </section>
    </PublicPage>
  );
}
