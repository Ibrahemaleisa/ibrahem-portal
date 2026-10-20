import { site } from "@/content/site";
import { ogCard, ogSize } from "@/lib/og/card";

export const dynamic = "force-static";
export const alt = `${site.name} — products, websites & business systems`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Independent builder",
    title: "Digital products, smarter systems, and tools that make businesses work better.",
    footer: "Websites · Products · Internal tools · Automation",
  });
}
