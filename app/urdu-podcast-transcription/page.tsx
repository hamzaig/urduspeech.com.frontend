import type { Metadata } from "next";
import { VerticalLandingView } from "@/components/vertical-landing";
import { verticalPages } from "@/lib/public-verticals";
import { publicMetadata } from "@/lib/seo";

const spec = verticalPages["urdu-podcast-transcription"];

export const metadata: Metadata = publicMetadata({
  title: spec.title,
  description: spec.description,
  path: `/${spec.slug}`,
  ogImage: spec.ogImage,
});

export default function UrduPodcastTranscriptionPage() {
  return <VerticalLandingView spec={spec} />;
}
