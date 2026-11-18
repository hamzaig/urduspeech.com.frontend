import { redirect } from "next/navigation";
export default async function Reset({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  redirect(
    "/auth/reset-password" +
      (token ? "?token=" + encodeURIComponent(token) : ""),
  );
}
