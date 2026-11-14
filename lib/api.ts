export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(code);
  }
}
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  const response = await fetch("/api/backend" + path, {
    ...options,
    headers,
    credentials: "same-origin",
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(response.status, data.code ?? "REQUEST_FAILED");
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}
export function mutation(
  method: string,
  body: unknown,
  key?: string,
): RequestInit {
  return {
    method,
    body: JSON.stringify(body),
    headers: key ? { "Idempotency-Key": key } : {},
  };
}
export function explain(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401)
      return "Sign in to access your projects. If your email is not verified, check your inbox first.";
    if (error.status === 412)
      return "This transcript changed in another session. Reload it before saving your edits.";
    if (error.status === 429)
      return "Too many requests. Wait a moment, then try again.";
    if (error.status >= 500)
      return "The service is unavailable. Check your project or payment status before trying again.";
    return `The request could not be completed (${error.code}). Check your choices and try again.`;
  }
  return "The connection was interrupted. Check your connection and try again.";
}
export function minutes(seconds: number) {
  return new Intl.NumberFormat("en-PK", { maximumFractionDigits: 1 }).format(
    seconds / 60,
  );
}
export function money(minor: number) {
  return "PKR " + new Intl.NumberFormat("en-PK").format(minor / 100);
}
export function downloadPath(path: string) {
  if (!/^\/v1\/(exports|renders)\/[a-f0-9-]+\/download$/.test(path))
    throw Error("Invalid download path");
  return "/api/backend" + path;
}
