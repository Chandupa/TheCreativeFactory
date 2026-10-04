import { adsenseClient } from "@/lib/journal/ads";

// AdSense requires /ads.txt to authorise the publisher ID. Exists only once
// NEXT_PUBLIC_ADSENSE_CLIENT is set (static — rebuilt with the env var).
export const dynamic = "force-static";

export function GET() {
  if (!adsenseClient) return new Response("Not found", { status: 404 });
  const publisherId = adsenseClient.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
