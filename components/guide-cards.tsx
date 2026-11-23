import Link from "next/link";
import { Captions, FileText, FileVideo, Languages, Mic } from "lucide-react";
import { publicGuides, type PublicGuide } from "@/lib/public-guides";

const guideIcons = {
  "make-urdu-video-captions": Captions,
  "urdu-roman-urdu-and-english": Languages,
  "subtitle-and-video-exports": FileText,
  "voice-notes-to-text": Mic,
  "urdu-subtitles-for-youtube": FileVideo,
};

export function GuideCards({
  guides = publicGuides,
}: {
  guides?: readonly PublicGuide[];
}) {
  return (
    <ul className="guide-cards" role="list">
      {guides.map((guide) => {
        const Icon =
          guideIcons[guide.slug as keyof typeof guideIcons] ?? FileText;
        return (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`}>
              <span className="guide-card-head">
                <Icon size={18} aria-hidden="true" />
                <strong>{guide.title}</strong>
              </span>
              <span className="guide-card-summary">{guide.summary}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
