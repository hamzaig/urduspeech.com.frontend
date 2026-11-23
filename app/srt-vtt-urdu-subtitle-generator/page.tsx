import type { Metadata } from "next";
import { VerticalLandingView } from "@/components/vertical-landing";
import { verticalPages } from "@/lib/public-verticals";
import { publicMetadata } from "@/lib/seo";

const spec = verticalPages["srt-vtt-urdu-subtitle-generator"];

export const metadata: Metadata = publicMetadata({
  title: spec.title,
  description: spec.description,
  path: `/${spec.slug}`,
  ogImage: spec.ogImage,
});

export default function SrtVttUrduSubtitleGeneratorPage() {
  return <VerticalLandingView spec={spec} />;
}
