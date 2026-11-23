import type { Metadata } from "next";
import { VerticalLandingView } from "@/components/vertical-landing";
import { verticalPages } from "@/lib/public-verticals";
import { publicMetadata } from "@/lib/seo";

const spec = verticalPages["urdu-voice-notes-to-text"];

export const metadata: Metadata = publicMetadata({
  title: spec.title,
  description: spec.description,
  path: `/${spec.slug}`,
  ogImage: spec.ogImage,
});

export default function UrduVoiceNotesToTextPage() {
  return <VerticalLandingView spec={spec} />;
}
