"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative text-sm transition-colors ${active ? "text-ink" : "text-ink-2 hover:text-ink"} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-[1.3rem] left-0 h-px bg-ink transition-all duration-500 ease-out-quart md:-bottom-[1.55rem] ${active ? "w-full" : "w-0"}`}
      />
    </Link>
  );
}
