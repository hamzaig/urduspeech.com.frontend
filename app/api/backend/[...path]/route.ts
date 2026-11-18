import { bridge } from "@/lib/bridge";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
async function handle(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return bridge(request, (await params).path, process.env);
}
export { handle as GET, handle as POST, handle as PATCH, handle as DELETE };
