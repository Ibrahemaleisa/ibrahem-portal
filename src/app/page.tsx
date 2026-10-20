import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ProjectCover } from "@/components/project-cover";
import { SectionLabel } from "@/components/section-label";
import { StatusBadge } from "@/components/status-badge";
import { Value } from "@/components/value";
import { about } from "@/content/about";
import { featuredProjects, projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function HomePage() {
  const featured = featuredProjects();

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-14 pb-20 md:pt-24 md:pb-28" aria-labelledby="hero-title">
        <div className="rise">
          <p className="eyebrow flex flex-wrap gap-x-3">
            <span className="text-ink">{site.name}</span>
            <span aria-hidden>/</span>
            <span>Independent builder</span>
          </p>
          <h1 id="hero-title" className="display mt-8 max-w-[17ch] text-[clamp(2.75rem,8.4vw,8.25rem)]">
            {site.headline.lead} <em className="text-ink-2">{site.headline.emphasis}</em>
          </h1>
          <div className="grid-12 mt-12 gap-y-10 md:mt-16">
            <p className="col-span-4 max-w-[46ch] text-lg leading-relaxed text-ink-2 md:col-span-5 md:col-start-1">
              {site.intro}
            </p>
            <dl className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-5 self-end text-sm md:col-span-6 md:col-start-7">
              <div className="border-t border-rule pt-3">
                <dt className="eyebrow mb-1">Focus</dt>
                <dd>Products, websites &amp; business systems</dd>
              </div>
              <div className="border-t border-rule pt-3">
                <dt className="eyebrow mb-1">Languages</dt>
                <dd>
                  English · <span lang="ar">العربية</span>
                </dd>
              </div>
              <div className="border-t border-rule pt-3">
                <dt className="eyebrow mb-1">Based in</dt>
                <dd>
                  <Value value={site.location} />
                </dd>
              </div>
              <div className="border-t border-rule pt-3">
                <dt className="eyebrow mb-1">Availability</dt>
                <dd>
                  <Value value={site.availability} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="wrap" aria-labelledby="work-title">
        <SectionLabel index="01" id="work-title">
          Selected work
        </SectionLabel>
        <div className="mt-10 space-y-24 md:mt-14 md:space-y-32">
          {featured.map((p, i) => (
            <article key={p.slug} className="group grid-12 reveal gap-y-8">
              <Link
                href={`/work/${p.slug}`}
                className={`col-span-4 md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}
                aria-label={`${p.title} — read the case study`}
                tabIndex={-1}
              >
                <ProjectCover project={p} priority={i === 0} />
              </Link>
              <div className={`col-span-4 flex flex-col md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1 md:pr-6" : "md:pl-6"}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")} / {p.categories[0]}
                  </span>
                  <span className="eyebrow">{p.period}</span>
                </div>
                <h3 className="display mt-6 text-[clamp(2.5rem,5vw,4.25rem)]">
                  <Link href={`/work/${p.slug}`} className="link-draw">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-4 text-lg text-ink-2">{p.tagline}</p>
                <div className="mt-6">
                  <StatusBadge status={p.status} note={p.statusNote} />
                </div>
                <dl className="mt-8 space-y-0 text-sm">
                  {p.facts.slice(0, 3).map((f) => (
                    <div key={f.label} className="flex justify-between gap-6 border-t border-rule py-3">
                      <dt className="text-ink-3">{f.label}</dt>
                      <dd className="text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/work/${p.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  <span className="link-draw">Read the case study</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-20 flex items-center justify-between border-t border-rule pt-6">
          <p className="text-ink-2">
            {projects.length} projects, each labelled with its real status.
          </p>
          <Link href="/work" className="shrink-0 text-sm font-medium">
            <span className="link-draw">All work</span> →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="wrap mt-32 md:mt-44" aria-labelledby="services-title">
        <SectionLabel index="02" id="services-title">
          What you can hire me for
        </SectionLabel>
        <ol className="mt-10">
          {services.map((s, i) => (
            <li key={s.id} className="reveal grid-12 gap-y-3 border-b border-rule py-8 first:pt-2 md:py-10">
              <span className="eyebrow col-span-1 pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display col-span-3 text-[1.9rem] md:col-span-5 md:text-[2.6rem]">{s.title}</h3>
              <p className="col-span-4 text-ink-2 md:col-span-5 md:col-start-8 md:pt-2">{s.summary}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/services" className="text-sm font-medium">
            <span className="link-draw">How engagements work</span> →
          </Link>
        </div>
      </section>

      {/* Principles */}
      <section className="wrap mt-32 md:mt-44" aria-labelledby="how-title">
        <SectionLabel index="03" id="how-title">
          How I work
        </SectionLabel>
        <div className="grid-12 mt-10 gap-y-12">
          <p className="display col-span-4 text-[clamp(2rem,4vw,3.25rem)] md:col-span-5">
            Technical execution, business understanding and <em>operational thinking</em> — in one person.
          </p>
          <ul className="col-span-4 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
            {about.principles.map((pr) => (
              <li key={pr.title} className="reveal border-t border-rule pt-4">
                <h3 className="font-medium">{pr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{pr.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap mt-32 md:mt-44" aria-labelledby="cta-title">
        <div className="relative overflow-hidden rounded-sm bg-ink px-6 py-16 text-paper md:px-14 md:py-24">
          <p className="eyebrow text-paper/60">04 — Start a project</p>
          <h2 id="cta-title" className="display mt-6 max-w-[18ch] text-[clamp(2.4rem,6vw,5.5rem)]">
            Tell me what&rsquo;s slowing your business down.
          </h2>
          <p className="mt-6 max-w-[48ch] text-paper/70">
            A website that undersells you, a process stuck in spreadsheets, or a product idea that needs a first real version.
            I reply to every inquiry personally.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-paper px-6 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-on-accent"
          >
            Send a project inquiry
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
