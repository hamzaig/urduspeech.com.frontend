import { buildLlmsFullTxt } from "@/lib/markdown-mirrors";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
