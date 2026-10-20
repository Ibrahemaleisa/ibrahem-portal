import { pending } from "@/lib/pending";
import type { Maybe } from "@/lib/types";

export const site = {
  name: "Ibrahim Al-Eisa",
  nameAr: "إبراهيم العيسى",
  shortName: "Ibrahim Al-Eisa",
  role: "Independent builder — products, websites & business systems",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  description:
    "Ibrahim Al-Eisa builds digital products, websites and the operational systems behind them — bilingual, Arabic-first, and grounded in how a business actually runs.",

  headline: {
    lead: "I build digital products, smarter systems,",
    emphasis: "and the tools that make businesses work better.",
  },
  intro:
    "I'm an independent builder working across product, engineering and operations. I take a messy process — a spreadsheet that runs a company, a website that undersells it, a workflow held together by WhatsApp — and turn it into software people can rely on.",

  location: "Saudi Arabia" as Maybe<string>,
  timezone: "Asia/Riyadh",
  languages: ["Arabic", "English"],
  availability: pending("Current availability — e.g. “Taking on projects from November 2026”."),

  /** Public contact address. Leave as pending until you decide which address to publish. */
  email: pending("Public contact email to show on the site.") as Maybe<string>,
  social: [
    { label: "GitHub", href: "https://github.com/Ibrahemaleisa" },
    // { label: "LinkedIn", href: "https://www.linkedin.com/in/…" },
  ],
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
