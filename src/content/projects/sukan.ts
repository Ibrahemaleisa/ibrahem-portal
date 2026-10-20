import type { Project } from "@/lib/types";

const project: Project = {
  slug: "sukan",
  title: "Sukan",
  titleAr: "سُكان",
  tagline: "Shared housing for the Saudi market — explored through four deliberate iterations.",
  summary:
    "A shared-housing and co-living platform: housing profiles, compatible roommates, structured agreements and shared expenses. I've taken it from a validated waitlist page through an operations prototype to a clean production foundation.",
  categories: ["Digital products", "Experiments"],
  status: "in-development",
  statusNote: "Foundation built · product modules next",
  period: "Mar – Aug 2026",
  updated: "2026-08",
  context: "Independent product",
  role: ["Product research", "Product definition", "Prototyping", "Full-stack build"],
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "PostgreSQL + Drizzle",
    "Auth.js v5",
    "next-intl (Arabic default, RTL)",
    "Zod",
    "Vitest",
    "Earlier: FastAPI, Supabase, TanStack Start",
  ],
  facts: [
    { label: "Iterations", value: "4" },
    { label: "Market", value: "Saudi Arabia · SAR" },
    { label: "Current stage", value: "Auth, i18n, data layer, tests" },
  ],
  links: [{ label: "Source (foundation)", href: "https://github.com/Ibrahemaleisa/Sukan-301", kind: "repo" }],
  featured: true,
  cover: {
    tone: "moss",
    modules: ["Waitlist", "Ops prototype", "Dashboard", "Foundation"],
  },
  gallery: [],
  galleryPending: ["Arabic waitlist landing page", "Operations prototype console", "Resident dashboard (prototype)", "Production foundation — landing and sign-in"],
  caseStudy: {
    overview: [
      "Sukan (سُكان, “residents”) is a shared-housing platform for Saudi Arabia. The long-term product lets people build a housing profile, discover shared-housing opportunities, find compatible roommates, form structured digital housing agreements, and track rent and shared expenses.",
      "Rather than building the whole thing at once, I used a series of fast, cheap iterations to test the idea and the shape of the product — and then started again, properly, on a foundation designed to last.",
    ],
    problem: [
      "Shared housing is common among students and young professionals, but it runs on informal arrangements: a listing in a group chat, a verbal agreement, and a spreadsheet — or an argument — for splitting the bills. There is little structure for finding a compatible housemate, and little protection when things go wrong.",
    ],
    role: [
      "Independent product. I did the research and positioning, wrote the product requirements, and built each iteration — using AI-assisted tools for the early prototypes (Kimi, Codex, Lovable) and a deliberate, reviewed architecture for the foundation.",
    ],
    approach: [
      {
        title: "1 · Waitlist concept (Mar – Apr 2026)",
        body: "An Arabic, right-to-left landing page with a working lead form that stores name, city, employment status, budget and move-in date in Supabase — the cheapest way to test whether the message landed.",
      },
      {
        title: "2 · Operations prototype (Apr 2026)",
        body: "A FastAPI + SQLite service covering properties, tenants, contracts, payments, expenses, maintenance tickets, an audit log and a finance CSV export, with three roles and a simple roommate-compatibility score (shared interests, sleep schedule, cleanliness). Covered by integration tests.",
      },
      {
        title: "3 · Resident dashboard (Apr 2026)",
        body: "A React + Supabase app with a row-level-security schema for properties, rooms, leases, shared bills (equal, by room size, by usage or custom splits) and maintenance — partly wired, partly mock data, used to explore the resident experience.",
      },
      {
        title: "4 · Production foundation (Aug 2026)",
        body: "A fresh, intentionally narrow Next.js codebase: PostgreSQL and Drizzle, Auth.js with a seam for national-ID sign-in later, Arabic-first localisation, validation including Saudi mobile numbers, and unit tests. Listings, matching, agreements and payments are explicitly out of scope until the base is right.",
      },
    ],
    build: [
      "The prototypes answered different questions — would people sign up, what an operator needs day to day, how bill-splitting should feel — and each was thrown away once it had answered its question.",
      "The foundation carries forward the decisions that held up: Arabic as the default locale with full English, prices in Saudi riyals, and a data model that starts with identity and trust rather than listings.",
    ],
    deliverables: [
      "Product requirements and personas (owner, tenant, operator)",
      "Waitlist landing page with live lead capture",
      "Operations API prototype with tests",
      "Resident dashboard prototype",
      "Production foundation: auth, i18n, database, tests",
    ],
    results: [],
    resultsPending: "Pre-launch. No user, sign-up or revenue figures are claimed here.",
    lessons: [
      "AI tools made it cheap to try four shapes of the same product. The discipline was in throwing them away and not shipping a prototype as a foundation.",
      "Trust is the product: identity, agreements and transparent bill-splitting matter more than the listing page.",
    ],
    next: ["Housing profiles and listings", "Roommate matching", "Digital housing agreements", "Rent and shared-expense tracking"],
  },
  verify: [
    "Add screenshots of each iteration (the static pages can be captured as-is).",
    "Confirm whether the waitlist collected real sign-ups you're willing to cite.",
    "Confirm you're comfortable naming the AI tools used for early prototypes.",
  ],
};

export default project;
