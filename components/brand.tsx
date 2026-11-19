import Link from "next/link";
import { AudioLines } from "lucide-react";

export function Brand({ studio = false }: { studio?: boolean }) {
  return (
    <Link
      className="brand"
      href={studio ? "/studio" : "/"}
      aria-label={studio ? "UrduSpeech studio" : "UrduSpeech home"}
    >
      <span className="brand-mark" aria-hidden="true">
        <AudioLines size={20} strokeWidth={2.2} />
      </span>
      <span>UrduSpeech</span>
    </Link>
  );
}
