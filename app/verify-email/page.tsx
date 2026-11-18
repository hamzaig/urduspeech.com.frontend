import { redirect } from "next/navigation";
export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  redirect(
    "/auth/verify-email" + (token ? "?token=" + encodeURIComponent(token) : ""),
  );
}
