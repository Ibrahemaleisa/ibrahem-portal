/**
 * npm run check:content
 *
 * Validates the portfolio content (slugs, images, cross-references) and
 * prints every unverified item, so you know exactly what to confirm
 * before switching NEXT_PUBLIC_SHOW_DRAFT_NOTES off.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { about, education, experience } from "../src/content/about";
import { projects } from "../src/content/projects";
import { services } from "../src/content/services";
import { site } from "../src/content/site";
import { isPending } from "../src/lib/pending";

const errors: string[] = [];
const todo: string[] = [];
const publicDir = join(process.cwd(), "public");

const slugs = new Set<string>();
for (const p of projects) {
  if (slugs.has(p.slug)) errors.push(`Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) errors.push(`${p.slug}: slug must be lowercase letters, digits and dashes`);
  if (p.summary.length > 320) errors.push(`${p.slug}: summary is ${p.summary.length} chars — keep it under 320 for cards and meta descriptions`);
  const media = [...p.gallery, ...(p.cover.image ? [p.cover.image] : [])];
  for (const m of media) {
    if (!existsSync(join(publicDir, m.src))) errors.push(`${p.slug}: missing image public${m.src}`);
    if (!m.alt.trim()) errors.push(`${p.slug}: image ${m.src} has no alt text`);
  }
  for (const l of p.links) {
    if (!/^https:\/\//.test(l.href)) errors.push(`${p.slug}: link "${l.label}" should be https`);
    if (l.unverified) todo.push(`[${p.slug}] Check link works and is public: ${l.href}`);
  }
  if (p.status === "completed" && !p.caseStudy.results.length)
    errors.push(`${p.slug}: marked completed but has no verified results`);
  for (const v of p.verify ?? []) todo.push(`[${p.slug}] ${v}`);
  for (const g of p.galleryPending ?? []) todo.push(`[${p.slug}] Screenshot: ${g}`);
}

for (const s of services)
  for (const slug of s.evidence) if (!slugs.has(slug)) errors.push(`Service "${s.title}" references unknown project "${slug}"`);

for (const [key, value] of Object.entries(site)) if (isPending(value as never)) todo.push(`[site.${key}] ${(value as { note: string }).note}`);
for (const e of experience)
  for (const [k, v] of Object.entries(e)) if (isPending(v as never)) todo.push(`[experience: ${e.organisation}] ${k} — ${(v as { note: string }).note}`);
if (isPending(education)) todo.push(`[about] ${education.note}`);
void about;

console.log(`\nContent check — ${projects.length} projects, ${services.length} services\n`);
if (errors.length) {
  console.log("Errors:");
  for (const e of errors) console.log(`  ✗ ${e}`);
}
console.log(`To confirm before launch (${todo.length}):`);
for (const t of todo) console.log(`  ◌ ${t}`);
console.log("");
process.exit(errors.length ? 1 : 0);
