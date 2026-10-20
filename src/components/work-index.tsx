"use client";

import { useState } from "react";
import type { Category, Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function WorkIndex({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));
  const options: (Category | "All")[] = ["All", ...categories.filter((c) => projects.some((p) => p.categories.includes(c)))];

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 border-b border-rule pb-6">
        {options.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 ${
                on ? "border-ink bg-ink text-paper" : "border-rule-strong text-ink-2 hover:border-ink hover:text-ink"
              }`}
            >
              {c}
              <span className={`font-mono text-[0.7rem] ${on ? "text-paper/60" : "text-ink-3"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>
      <div className="mt-12 grid gap-x-8 gap-y-20 md:grid-cols-2 md:gap-x-10">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
