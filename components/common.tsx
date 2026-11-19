"use client";
import Link from "next/link";
import { AlertCircle, Upload, Check } from "lucide-react";
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
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
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
