import { statusLabel } from "@/content/projects";
import type { ProjectStatus } from "@/lib/types";

const dot: Record<ProjectStatus, string> = {
  completed: "var(--status-completed)",
  prototype: "var(--status-prototype)",
  "in-development": "var(--status-dev)",
  concept: "var(--status-concept)",
};

export function StatusBadge({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2 text-ink-2">
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${status === "in-development" ? "animate-pulse" : ""}`}
        style={{ background: dot[status] }}
      />
      <span>
        <span className="sr-only">Status: </span>
        {statusLabel[status]}
        {note ? <span className="text-ink-3"> · {note}</span> : null}
      </span>
    </span>
  );
}
