"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-10 items-center gap-2 px-2 text-sm"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden className="relative block h-2.5 w-4">
          <span className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
        </span>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 z-40 border-t border-rule bg-paper"
      >
        <nav aria-label="Main" className="wrap flex flex-col pt-6">
          {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex items-baseline justify-between border-b border-rule py-5"
            >
              <span className="display text-4xl">{item.label}</span>
              <span className="eyebrow">0{i + 1}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
