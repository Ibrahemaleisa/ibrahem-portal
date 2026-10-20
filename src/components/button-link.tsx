import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "solid" | "ghost"; external?: boolean };

export function ButtonLink({ href, children, variant = "solid", external }: Props) {
  const base =
    "group inline-flex h-12 items-center gap-3 rounded-full px-6 text-sm font-medium transition-[background-color,color,border-color] duration-300";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-accent hover:text-on-accent"
      : "border border-rule-strong text-ink hover:border-ink";
  const arrow = (
    <span aria-hidden className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
      →
    </span>
  );
  if (external) {
    return (
      <a href={href} className={`${base} ${styles}`} target="_blank" rel="noopener">
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      {arrow}
    </Link>
  );
}
