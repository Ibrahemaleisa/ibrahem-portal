import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { categories, projects, statusLabel } from "@/content/projects";
import type { ProjectStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work",
  description: "Products, business systems and storefronts I've built — each with its real status: completed, working prototype, in development or experiment.",
  alternates: { canonical: "/work" },
};

const legend: { status: ProjectStatus; body: string }[] = [
  { status: "completed", body: "Shipped and in use." },
  { status: "prototype", body: "Works end-to-end; not yet in production use." },
  { status: "in-development", body: "Being built now; parts are live." },
  { status: "concept", body: "Explorations and studies." },
];

export default function WorkPage() {
  return (
    <div className="wrap pt-14 md:pt-24">
      <header className="grid-12 gap-y-8 pb-14 md:pb-20">
        <p className="eyebrow col-span-4 md:col-span-12">Work · {projects.length} projects</p>
        <h1 className="display col-span-4 text-[clamp(3rem,9vw,8rem)] md:col-span-8">
          Things I&rsquo;ve <em>actually</em> built.
        </h1>
        <div className="col-span-4 self-end md:col-span-4">
          <p className="text-ink-2">
            Every project is labelled honestly. Where a screenshot doesn&rsquo;t exist yet, you&rsquo;ll see a cover drawn from the
            project&rsquo;s real modules instead of a mock-up.
          </p>
          <ul className="mt-6 space-y-1.5 text-sm">
            {legend.map((l) => (
              <li key={l.status} className="flex gap-3">
                <span className="w-36 shrink-0 font-medium">{statusLabel[l.status]}</span>
                <span className="text-ink-3">{l.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <WorkIndex projects={projects} categories={categories} />
    </div>
  );
}
