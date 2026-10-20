import { getProject, projects, statusLabel } from "@/content/projects";
import { ogCard, ogSize } from "@/lib/og/card";

export const dynamic = "force-static";
export const dynamicParams = false;
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug)!;
  return ogCard({ eyebrow: `Case study · ${statusLabel[p.status]}`, title: p.title, footer: p.tagline });
}
