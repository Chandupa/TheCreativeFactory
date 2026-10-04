import { ADSENSE_CLIENT } from "@/lib/journal/ads";

// Authorises the AdSense publisher ID for this domain (required by AdSense).
export const dynamic = "force-static";

export function GET() {
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0
`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
