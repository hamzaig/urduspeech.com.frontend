"use client";
import Link from "next/link";
import { AlertCircle, AudioLines, Upload, Check } from "lucide-react";
export function ErrorNotice({
  message,
  retry,
  signIn = false,
}: {
  message: string;
  retry?: () => void;
  signIn?: boolean;
}) {
  return (
    <div className="error-notice" role="alert">
      <AlertCircle size={19} />
      <div>
        <p>{message}</p>
        {signIn && <Link href="/auth/sign-in">Sign in</Link>}
        {retry && (
          <button className="text-button" onClick={retry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
export function PageTitle({
  title,
  description,
  action,
}: {
  title: React.ReactNode;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function CaptionExample({
  preset = "social-highlight:1",
  text = "Har lafz ko apni pehchaan dein.",
  isExample = true,
}: {
  preset?: string;
  text?: string;
  isExample?: boolean;
}) {
  return (
    <div className="example-wrap">
      <div className={"caption-frame " + preset.split(":")[0]}>
        <div className="frame-top">
          <AudioLines size={20} />
          <span>{isExample ? "Caption example" : "Caption style preview"}</span>
        </div>
        <div className="voice-art" aria-hidden="true">
          {[22, 45, 32, 67, 90, 52, 75, 110, 72, 46, 82, 58, 34, 50, 25].map(
            (v, i) => (
              <i key={i} style={{ height: v }} />
            ),
          )}
        </div>
        <p className="preview-caption" dir="auto">
          {text}
        </p>
        <div className="frame-bottom">
          <span>Preview only</span>
          <span>9:16</span>
        </div>
      </div>
      {isExample && (
        <p className="caption-note">
          A style example. Your own media appears after upload.
        </p>
      )}
    </div>
  );
}
export function UploadLink() {
  return (
    <Link className="button" href="/studio/new">
      <Upload size={18} />
      Upload audio or video
    </Link>
  );
}
export function Saved({ children }: { children: React.ReactNode }) {
  return (
    <p className="success" role="status">
      <Check size={16} />
      {children}
    </p>
  );
}
