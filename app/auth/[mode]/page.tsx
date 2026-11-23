import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { AUTH_MODES, type AuthMode } from "@/lib/auth-modes";
import { AuthForm } from "./auth-form";

type AuthParams = { params: Promise<{ mode: string }> };

function resolveMode(mode: string): AuthMode {
  if (mode === "login") permanentRedirect("/auth/sign-in");
  if (mode === "signup") permanentRedirect("/auth/register");
  if (!Object.hasOwn(AUTH_MODES, mode)) notFound();
  return mode as AuthMode;
}

export async function generateMetadata({
  params,
}: AuthParams): Promise<Metadata> {
  const { mode } = await params;
  if (!Object.hasOwn(AUTH_MODES, mode)) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }
  const config = AUTH_MODES[mode as AuthMode];
  return {
    title: config.title.replace(/\.$/, ""),
    description: config.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AuthPage({ params }: AuthParams) {
  const { mode } = await params;
  const resolved = resolveMode(mode);
  return (
    <Suspense fallback={null}>
      <AuthForm mode={resolved} />
    </Suspense>
  );
}
