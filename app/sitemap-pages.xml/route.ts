import { pagesSitemap } from "@/lib/sitemaps";
import { urlsetXml, xmlResponse } from "@/lib/xml";

export const revalidate = 300;

export function GET() {
  return xmlResponse(urlsetXml(pagesSitemap()));
}
