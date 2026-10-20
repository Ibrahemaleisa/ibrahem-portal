import Image from "next/image";
import type { Project } from "@/lib/types";

const tones: Record<Project["cover"]["tone"], { bg: string; fg: string; line: string; muted: string }> = {
  ink: { bg: "#171715", fg: "#ece8de", line: "rgba(236,232,222,0.16)", muted: "rgba(236,232,222,0.72)" },
  paper: { bg: "#e2ddcf", fg: "#151513", line: "rgba(21,21,19,0.14)", muted: "rgba(21,21,19,0.68)" },
  accent: { bg: "#9c3812", fg: "#fbf3ec", line: "rgba(251,243,236,0.2)", muted: "rgba(251,243,236,0.8)" },
  moss: { bg: "#2c4532", fg: "#eef0e4", line: "rgba(238,240,228,0.18)", muted: "rgba(238,240,228,0.78)" },
  lapis: { bg: "#1e2c62", fg: "#eceffa", line: "rgba(236,239,250,0.18)", muted: "rgba(236,239,250,0.78)" },
};

/**
 * Project cover. Uses a real screenshot when one exists; otherwise a
 * typographic "system map" drawn from the project's real module names —
 * never an invented screenshot.
 */
export function ProjectCover({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const t = tones[project.cover.tone];
  const image = project.cover.image;

  if (image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: t.bg }}>
        <div className="absolute top-[9%] right-0 bottom-0 left-[7%] overflow-hidden rounded-tl-md shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform duration-700 ease-out-quart group-hover:-translate-y-1">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover object-left-top"
          />
        </div>
      </div>
    );
  }

  const modules = project.cover.modules.slice(0, 8);
  return (
    <div
      className="@container relative aspect-[16/10] overflow-hidden"
      style={{ background: t.bg, color: t.fg }}
      role="img"
      aria-label={`${project.title} cover: a map of its modules — ${project.cover.modules.join(", ")}.`}
    >
      {project.titleAr ? (
        <span
          lang="ar"
          dir="rtl"
          aria-hidden
          className="absolute top-[6%] right-[5%] leading-none font-medium transition-transform duration-700 ease-out-quart group-hover:-translate-y-1"
          style={{ fontFamily: "var(--font-arabic)", fontSize: "clamp(2.25rem, 13cqw, 10rem)" }}
        >
          {project.titleAr}
        </span>
      ) : (
        <span
          aria-hidden
          className="display absolute top-[7%] left-[5%] italic"
          style={{ fontSize: "clamp(2rem, 9cqw, 6rem)" }}
        >
          {project.title}
        </span>
      )}

      <ol
        aria-hidden
        className="absolute inset-x-[5%] bottom-[7%] grid grid-cols-2 @md:grid-cols-4"
        style={{ borderTop: `1px solid ${t.line}` }}
      >
        {modules.map((m, i) => (
          <li
            key={m}
            className="flex items-baseline gap-2 py-[0.55em] pr-2 text-[clamp(0.6rem,2cqw,0.85rem)] @max-md:[&:nth-child(n+5)]:hidden"
            style={{ borderBottom: `1px solid ${t.line}` }}
          >
            <span className="font-mono" style={{ color: t.muted }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="truncate">{m}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
