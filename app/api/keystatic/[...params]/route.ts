import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";
import { isCmsEnabled } from "@/lib/journal/cms";

// Created lazily: Keystatic throws at creation in production when the GitHub
// credentials are missing, which would otherwise break the build.
let handler: ReturnType<typeof makeRouteHandler> | undefined;

function getHandler() {
  if (!isCmsEnabled()) return null;
  handler ??= makeRouteHandler({ config });
  return handler;
}

export async function GET(request: Request) {
  return getHandler()?.GET(request) ?? new Response("Not found", { status: 404 });
}

export async function POST(request: Request) {
  return getHandler()?.POST(request) ?? new Response("Not found", { status: 404 });
}
