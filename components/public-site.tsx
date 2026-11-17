import Link from "next/link";
import { AudioLines, ArrowRight } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="public-header">
      <Link className="brand" href="/" aria-label="UrduSpeech home">
        <span className="brand-mark">
          <AudioLines size={24} />
        </span>
        <span>
          Urdu<span className="brand-light">Speech</span>
        </span>
      </Link>
      <nav aria-label="Website navigation">
        <Link href="/#pricing">Pricing</Link>
        <Link href="/supported-formats">Supported formats</Link>
        <Link href="/auth/sign-in">
          Sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <Link href="/">UrduSpeech</Link>
        <p>AI transcripts and captions for Pakistani creators.</p>
      </div>
      <nav aria-label="Service information">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/refunds">Payments & refunds</Link>
        <Link href="/supported-formats">Supported formats</Link>
        <a href="mailto:notification@urduspeech.com">Contact</a>
      </nav>
      <small>Operated by MoonSys Ltd. Prices are in Pakistani rupees.</small>
    </footer>
  );
}

export function PolicyPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="public-site">
      <PublicHeader />
      <main id="main" className="policy-page">
        <p className="policy-date">Launch policy · Updated 18 November 2026</p>
        <h1>{title}</h1>
        <p className="policy-intro">{description}</p>
        <div className="policy-content">{children}</div>
      </main>
      <PublicFooter />
    </div>
  );
}
