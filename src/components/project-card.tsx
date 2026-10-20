import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectCover } from "./project-cover";
import { StatusBadge } from "./status-badge";

export function ProjectCard({ project, index, headingLevel = 2 }: { project: Project; index: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group reveal">
      <Link href={`/work/${project.slug}`} className="block" aria-label={`${project.title} — case study`}>
        <ProjectCover project={project} sizes="(min-width: 768px) 50vw, 100vw" />
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
        <StatusBadge status={project.status} />
      </div>
      <Heading className="display mt-3 text-[2rem] md:text-[2.4rem]">
        <Link href={`/work/${project.slug}`} className="link-draw">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-3 max-w-[52ch] text-ink-2">{project.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 text-sm">
        <div>
          <dt className="eyebrow mb-1">Category</dt>
          <dd>{project.categories.join(" · ")}</dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Role</dt>
          <dd>{project.role.slice(0, 3).join(", ")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="eyebrow mb-1">Stack</dt>
          <dd className="text-ink-2">{project.stack.slice(0, 5).join(" · ")}</dd>
        </div>
      </dl>
      {project.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener" className="link-under text-ink-2 hover:text-ink">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
