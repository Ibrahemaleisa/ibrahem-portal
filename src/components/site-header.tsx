import Link from "next/link";
import { nav, site } from "@/content/site";
import { LocalTime } from "./local-time";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <div className="wrap flex h-14 items-center justify-between gap-6 md:h-16">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name} — home`}>
          <span className="text-[0.95rem] font-medium tracking-tight">{site.name}</span>
          <span lang="ar" dir="rtl" className="hidden text-sm text-ink-3 transition-colors group-hover:text-ink-2 sm:inline">
            {site.nameAr}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocalTime />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
