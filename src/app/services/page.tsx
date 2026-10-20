import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { SectionLabel } from "@/components/section-label";
import { getProject } from "@/content/projects";
import { engagementSteps, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website review and improvement, websites and storefronts, digital products, internal tools and automation, and process design — for businesses in Saudi Arabia and beyond.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="wrap pt-14 md:pt-24">
      <header className="grid-12 gap-y-8 pb-16 md:pb-24">
        <p className="eyebrow col-span-4 md:col-span-12">Services</p>
        <h1 className="display col-span-4 text-[clamp(3rem,8.5vw,7.5rem)] md:col-span-9">
          Hire me to fix, build or <em>systemise.</em>
        </h1>
        <p className="col-span-4 max-w-[52ch] text-lg text-ink-2 md:col-span-6">
          I work best with small and mid-sized businesses and teams who need someone who understands the business problem and
          can also ship the solution. Every service below is backed by work you can look at.
        </p>
      </header>

      <SectionLabel index="01">Services</SectionLabel>
      <div className="mt-4">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="reveal grid-12 gap-y-6 border-b border-rule py-12 md:py-16">
            <span className="eyebrow col-span-4 md:col-span-1 md:pt-3">{String(i + 1).padStart(2, "0")}</span>
            <div className="col-span-4 md:col-span-5">
              <h2 id={`${s.id}-title`} className="display text-[clamp(2rem,3.6vw,3rem)]">
                {s.title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-ink-2">{s.summary}</p>
            </div>
            <div className="col-span-4 md:col-span-3 md:col-start-8">
              <h3 className="eyebrow mb-3">Typically includes</h3>
              <ul className="space-y-2 text-sm">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span aria-hidden className="text-ink-3">
                      +
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 md:col-span-2">
              <h3 className="eyebrow mb-3">See it in</h3>
              <ul className="space-y-2 text-sm">
                {s.evidence.map((slug) => {
                  const p = getProject(slug);
                  return p ? (
                    <li key={slug}>
                      <Link href={`/work/${slug}`} className="link-under">
                        {p.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-28 md:mt-36">
        <SectionLabel index="02">How an engagement works</SectionLabel>
        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {engagementSteps.map((step, i) => (
            <li key={step.title} className="reveal">
              <span className="display text-6xl text-ink-3">{i + 1}</span>
              <h3 className="mt-4 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-28 grid-12 gap-y-8 border-t border-rule pt-10 md:mt-36">
        <div className="col-span-4 md:col-span-6">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">What I don&rsquo;t do</h2>
        </div>
        <div className="col-span-4 text-ink-2 md:col-span-5 md:col-start-8">
          <p>
            I&rsquo;m one person, not an agency, and I only offer what I can point to in my own work. If your project needs a
            larger team or a specialism I can&rsquo;t evidence here, I&rsquo;ll say so upfront rather than learn it on your budget.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Discuss a project</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
