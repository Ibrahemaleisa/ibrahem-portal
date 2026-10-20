import Link from "next/link";
import { nav, site } from "@/content/site";
import { Value } from "./value";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="wrap grid-12 gap-y-10 py-14">
        <div className="col-span-4 md:col-span-6">
          <p className="display text-3xl md:text-4xl">
            Have a project in mind?{" "}
            <Link href="/contact" className="italic text-accent link-draw">
              Let&rsquo;s talk.
            </Link>
          </p>
        </div>
        <div className="col-span-2 md:col-span-3">
          <p className="eyebrow mb-4">Pages</p>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw text-ink-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-3">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="link-draw text-ink-2 hover:text-ink" rel="me noopener" target="_blank">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li className="text-ink-2">
              <Value value={site.email} render={(email) => <a href={`mailto:${email}`} className="link-draw hover:text-ink">{email}</a>} />
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">
          © {year} {site.name}
        </p>
        <p className="eyebrow">
          <Value value={site.location} /> · Arabic &amp; English
        </p>
      </div>
    </footer>
  );
}
