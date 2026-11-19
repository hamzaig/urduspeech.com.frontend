import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/brand";

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-container public-header-inner">
        <Brand />
        <nav aria-label="Website navigation">
          <Link href="/#caption-demo">Caption demo</Link>
          <Link href="/#workflow">How it works</Link>
          <Link href="/#pricing">Pricing</Link>
        </nav>
        <Link className="public-sign-in" href="/auth/sign-in">
          Sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-container">
        <div className="public-footer-top">
          <div>
            <Brand />
            <p>Urdu transcription and captions for creators.</p>
          </div>
          <nav aria-label="Service information">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refunds">Payments &amp; refunds</Link>
            <Link href="/supported-formats">Supported formats</Link>
            <a href="mailto:notification@urduspeech.com">Contact</a>
          </nav>
        </div>
        <small>Operated by MoonSys Ltd. Prices are in Pakistani rupees.</small>
      </div>
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
      <main id="main" className="public-container policy-page">
        <h1>{title}</h1>
        <p className="policy-date">Updated 18 November 2026</p>
        <p className="policy-intro">{description}</p>
        <div className="policy-content">{children}</div>
      </main>
      <PublicFooter />
    </div>
  );
}
