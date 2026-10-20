/** Numbered section heading: "01 — Selected work". */
export function SectionLabel({ index, children, id }: { index: string; children: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-ink pt-4">
      <span className="eyebrow text-ink">{index}</span>
      <h2 id={id} className="eyebrow text-ink">
        {children}
      </h2>
    </div>
  );
}
