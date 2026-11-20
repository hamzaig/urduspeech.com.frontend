import { resolveDaylight } from "@/lib/daylight";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const daylight = await resolveDaylight(request);
  return Response.json(daylight, {
    headers: {
      "cache-control": "private, no-store",
    },
  });
}
