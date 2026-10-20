import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { SectionLabel } from "@/components/section-label";
import { Value } from "@/components/value";
import { about, education, experience } from "@/content/about";
import { site } from "@/content/site";
import { isPending, showDraftNotes } from "@/lib/pending";

export const metadata: Metadata = {
  title: "About",
  description: "How Ibrahim Al-Eisa thinks and works — product, engineering and operations in one person.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="wrap pt-14 md:pt-24">
      <header className="grid-12 gap-y-10 pb-16 md:pb-24">
        <p className="eyebrow col-span-4 md:col-span-12">About</p>
        <h1 className="display col-span-4 text-[clamp(3rem,8.5vw,7.5rem)] md:col-span-8">
          {site.name}
          <span lang="ar" dir="rtl" className="mt-3 block font-arabic text-[0.4em] font-normal tracking-normal text-ink-3">
            {site.nameAr}
          </span>
        </h1>
        <div className="prose-body col-span-4 md:col-span-6 md:col-start-1">
          {about.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      </header>

      <SectionLabel index="01">How I think</SectionLabel>
      <ul className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {about.principles.map((pr, i) => (
          <li key={pr.title} className="reveal">
            <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="display mt-3 text-[1.9rem]">{pr.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-2">{pr.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-28 md:mt-36">
        <SectionLabel index="02">Experience</SectionLabel>
        <p className="mt-6 max-w-[56ch] text-ink-2">
          My independent work sits on top of hands-on experience in fast-moving companies. Employment work is listed for context
          only — it isn&rsquo;t presented as freelance client work.
        </p>
        <ul className="mt-10">
          {experience
            .filter((e) => showDraftNotes || !isPending(e.role))
            .map((e) => (
              <li key={e.organisation} className="reveal grid-12 gap-y-2 border-t border-rule py-6">
                <span className="col-span-4 text-lg font-medium md:col-span-3">{e.organisation}</span>
                <span className="col-span-4 md:col-span-3">
                  <Value value={e.role} />
                </span>
                <span className="col-span-4 text-ink-2 md:col-span-4">
                  <Value value={e.summary} />
                </span>
                <span className="eyebrow col-span-4 md:col-span-2 md:text-right">
                  <Value value={e.period} />
                </span>
              </li>
            ))}
        </ul>
        {showDraftNotes && (
          <p className="mt-6 text-sm text-ink-3">
            Education: <Value value={education} />
          </p>
        )}
      </div>

      <div className="mt-28 flex flex-col items-start gap-8 border-t border-ink pt-10 md:mt-36 md:flex-row md:items-end md:justify-between">
        <p className="display max-w-[20ch] text-[clamp(2rem,4.5vw,3.75rem)]">The best way to know how I work is to work together.</p>
        <ButtonLink href="/contact">Get in touch</ButtonLink>
      </div>
    </div>
  );
}
