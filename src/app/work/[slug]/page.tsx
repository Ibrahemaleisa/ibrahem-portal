import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/project-cover";
import { StatusBadge } from "@/components/status-badge";
import { adjacentProjects, getProject, projects } from "@/content/projects";
import { showDraftNotes } from "@/lib/pending";
import type { Media, Project } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", title: `${p.title} — case study`, description: p.summary, url: `/work/${p.slug}` },
  };
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <section aria-labelledby={id} className="reveal border-t border-rule pt-6 pb-16 md:pb-20">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow">{String(n).padStart(2, "0")}</span>
        <h2 id={id} className="eyebrow text-ink">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Paragraphs({ items, lead = false }: { items: string[]; lead?: boolean }) {
  return (
    <div className="prose-body max-w-[64ch]">
      {items.map((t, i) => (
        <p key={i} className={lead && i === 0 ? "display !text-[clamp(1.6rem,2.6vw,2.2rem)] !leading-[1.2] text-ink" : ""}>
          {t}
        </p>
      ))}
    </div>
  );
}

function Figure({ m, priority = false }: { m: Media; priority?: boolean }) {
  return (
    <figure className={m.frame === "mobile" ? "" : "col-span-2"}>
      <div className="overflow-hidden rounded-sm bg-paper-2 ring-1 ring-rule">
        <Image
          src={m.src}
          alt={m.alt}
          width={m.width}
          height={m.height}
          sizes={m.frame === "mobile" ? "(min-width: 768px) 30vw, 50vw" : "(min-width: 1024px) 66vw, 100vw"}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {m.caption && <figcaption className="mt-3 max-w-[60ch] text-sm text-ink-3">{m.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ project }: { project: Project }) {
  const pendingShots = showDraftNotes ? (project.galleryPending ?? []) : [];
  if (!project.gallery.length && !pendingShots.length) return null;
  return (
    <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6">
      {project.gallery.map((m) => (
        <Figure key={m.src} m={m} />
      ))}
      {pendingShots.map((label) => (
        <figure key={label} className="col-span-2 md:col-span-1">
          <div className="flex aspect-[16/10] flex-col justify-between rounded-sm border border-dashed border-rule-strong bg-paper-2/60 p-5">
            <span className="eyebrow">Screenshot pending</span>
            <span className="text-sm text-ink-2">{label}</span>
          </div>
        </figure>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const cs = p.caseStudy;
  const { next } = adjacentProjects(p.slug);

  const ledger: { label: string; value: React.ReactNode }[] = [
    { label: "Status", value: <StatusBadge status={p.status} note={p.statusNote} /> },
    { label: "Context", value: p.context },
    { label: "Period", value: p.period },
    { label: "My role", value: p.role.join(", ") },
    { label: "Stack", value: <span className="text-ink-2">{p.stack.join(" · ")}</span> },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    alternateName: p.titleAr,
    abstract: p.summary,
    keywords: p.stack.join(", "),
    creativeWorkStatus: p.status,
    url: `/work/${p.slug}`,
  };

  return (
    <article>
      <header className="wrap pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="eyebrow flex gap-2">
          <Link href="/work" className="link-draw hover:text-ink">
            Work
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-2" aria-current="page">
            {p.title}
          </span>
        </nav>
        <div className="grid-12 mt-10 gap-y-8 md:mt-14">
          <div className="rise col-span-4 md:col-span-9">
            <h1 className="display text-[clamp(3.25rem,10vw,9rem)]">
              {p.title}
              {p.titleAr && (
                <span lang="ar" dir="rtl" className="mt-4 block w-fit font-arabic text-[0.28em] leading-tight font-normal tracking-normal text-ink-3">
                  {p.titleAr}
                </span>
              )}
            </h1>
            <p className="mt-6 max-w-[40ch] text-xl leading-snug text-ink-2 md:text-2xl">{p.tagline}</p>
          </div>
          <div className="col-span-4 self-end md:col-span-3">
            <StatusBadge status={p.status} note={p.statusNote} />
          </div>
        </div>
      </header>

      <div className="wrap mt-12 md:mt-16">
        <ProjectCover project={p} priority sizes="100vw" />
      </div>

      {p.facts.length > 0 && (
        <div className="wrap">
          <dl className="grid grid-cols-2 border-b border-rule md:grid-cols-4">
            {p.facts.map((f) => (
              <div key={f.label} className="border-rule py-5 pr-4 [&:not(:first-child)]:md:border-l md:pl-5 md:first:pl-0">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2 text-[0.95rem] leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="wrap grid-12 mt-16 gap-y-12 md:mt-24">
        <aside className="col-span-4 md:col-span-3" aria-label="Project details">
          <div className="md:sticky md:top-24">
            <dl className="text-sm">
              {ledger.map((row) => (
                <div key={row.label} className="border-t border-rule py-4">
                  <dt className="eyebrow mb-1.5">{row.label}</dt>
                  <dd className="leading-relaxed">{row.value}</dd>
                </div>
              ))}
              {p.links.length > 0 && (
                <div className="border-t border-rule py-4">
                  <dt className="eyebrow mb-1.5">Links</dt>
                  <dd>
                    <ul className="space-y-1.5">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener" className="link-under">
                            {l.label} ↗
                          </a>
                          {l.unverified && showDraftNotes && <span className="tbc ms-2">check before launch</span>}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>

        <div className="col-span-4 md:col-span-8 md:col-start-5">
          <Section n={1} title="Overview">
            <Paragraphs items={cs.overview} lead />
          </Section>

          <Section n={2} title="Problem or opportunity">
            <Paragraphs items={cs.problem} />
          </Section>

          <Section n={3} title="My role">
            <Paragraphs items={cs.role} />
          </Section>

          <Section n={4} title="Approach and decisions">
            <ol className="space-y-0">
              {cs.approach.map((d, i) => (
                <li key={d.title} className="grid gap-2 border-t border-rule py-6 first:border-t-0 first:pt-0 md:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-xs text-ink-3">{String.fromCharCode(97 + i)}.</span>
                  <div>
                    <h3 className="text-lg font-medium">{d.title}</h3>
                    <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-2">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section n={5} title="Design and development">
            <Paragraphs items={cs.build} />
            <Gallery project={p} />
          </Section>

          <Section n={6} title="Final deliverables">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {cs.deliverables.map((d) => (
                <li key={d} className="flex gap-3 border-t border-rule py-3 text-ink-2">
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section n={7} title="Results">
            {cs.results.length > 0 && (
              <ul className="space-y-3">
                {cs.results.map((r) => (
                  <li key={r} className="max-w-[62ch] text-lg leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {cs.resultsPending && (
              <p className={`max-w-[62ch] text-sm leading-relaxed text-ink-3 ${cs.results.length ? "mt-6 border-l-2 border-rule-strong pl-4" : ""}`}>
                <span className="font-medium text-ink-2">Not yet claimed: </span>
                {cs.resultsPending}
              </p>
            )}
          </Section>

          <Section n={8} title="Lessons and next steps">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-4 text-ink">What I learned</h3>
                <ul className="space-y-4 text-ink-2">
                  {cs.lessons.map((l) => (
                    <li key={l} className="leading-relaxed">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              {cs.next.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-4 text-ink">Next</h3>
                  <ul className="text-ink-2">
                    {cs.next.map((n) => (
                      <li key={n} className="border-t border-rule py-2.5">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>

          {showDraftNotes && p.verify && p.verify.length > 0 && (
            <aside aria-label="Draft notes" className="mb-16 rounded-sm border border-dashed border-rule-strong p-5 text-sm">
              <p className="eyebrow mb-3">Draft notes · to confirm before launch (hidden when drafts are off)</p>
              <ul className="list-disc space-y-1 pl-5 text-ink-2">
                {p.verify.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>

      {next && next.slug !== p.slug && (
        <nav aria-label="Next project" className="wrap mt-8">
          <Link href={`/work/${next.slug}`} className="group block border-t border-ink pt-6">
            <span className="eyebrow">Next project</span>
            <span className="display mt-4 flex items-baseline justify-between gap-6 text-[clamp(2.5rem,7vw,6rem)]">
              <span className="link-draw">{next.title}</span>
              <span aria-hidden className="text-ink-3 transition-transform duration-500 ease-out-quart group-hover:translate-x-2 group-hover:text-accent">
                →
              </span>
            </span>
          </Link>
        </nav>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
