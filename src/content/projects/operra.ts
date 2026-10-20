import type { Project } from "@/lib/types";

const shot = (file: string, alt: string, caption?: string, frame: "desktop" | "mobile" | "detail" = "desktop") => {
  const sizes: Record<string, [number, number]> = {
    "mobile-dashboard": [780, 1688],
    "mobile-project": [780, 1688],
    "crop-matrix": [1600, 810],
    "crop-workload": [1478, 1012],
  };
  const [width, height] = sizes[file] ?? [1600, 1000];
  return { src: `/work/operra/${file}.webp`, alt, caption, width, height, frame };
};

const project: Project = {
  slug: "operra",
  title: "Operra",
  titleAr: "أوبيرّا",
  tagline: "A bilingual workspace for creative and marketing agencies — built for my own agency first, then made white-label.",
  summary:
    "Clients, projects, reusable workflow modules, tasks, client approvals, chat, notifications and dashboards in one Arabic/English app. It started as the internal tool for Fada, my agency, and became a white-label product other agencies can brand as their own.",
  categories: ["Digital products", "Business systems"],
  status: "in-development",
  statusNote: "Deployed demo & product site",
  period: "Sep – Oct 2026",
  updated: "2026-10",
  context: "Own agency → independent product",
  role: ["Product owner", "UX & brand", "Full-stack build", "Deployment & operations"],
  stack: [
    "Next.js 16 (App Router, Server Actions)",
    "React 19",
    "TypeScript",
    "PostgreSQL (Neon)",
    "Drizzle ORM",
    "Tailwind CSS 4",
    "Zod",
    "Vercel + Vercel Blob",
    "Resend / SMTP",
    "Stripe · Lemon Squeezy",
    "GitHub Actions",
  ],
  facts: [
    { label: "Run modes", value: "Single agency or multi-tenant SaaS" },
    { label: "Languages", value: "Arabic (RTL) & English" },
    { label: "Workflow templates", value: "18 bundled" },
    { label: "CI", value: "Lint, types, tests, tenant-isolation check, build" },
  ],
  links: [
    { label: "Product site", href: "https://operra-site.vercel.app", kind: "site", unverified: true },
    { label: "Demo workspace", href: "https://workspace-demo-sooty.vercel.app", kind: "demo", unverified: true },
    { label: "Source", href: "https://github.com/Ibrahemaleisa/agency-workspace", kind: "repo" },
  ],
  featured: true,
  cover: {
    tone: "paper",
    modules: ["Clients", "Projects", "Modules", "Tasks", "Approvals", "Chat", "Reports", "Brand"],
    image: shot("dashboard", "Operra dashboard: five summary counters above a project health matrix comparing progress with time used for each project."),
  },
  gallery: [
    shot("project-board", "A project's task board with columns To Do, In Progress, Review, Waiting for Client and Completed.", "Project board. “Waiting for client” is its own stage, so delays are visible and attributable."),
    shot("client-approvals", "Approvals page listing items awaiting the client's sign-off.", "Client approvals — what's waiting, on whom, and since when."),
    shot("templates", "Module template editor with workflow stages and a client-approval checkbox per stage.", "Reusable module templates: stages become tasks, and any stage can require client approval."),
    shot("dashboard-ar", "The same dashboard in Arabic, laid out right to left.", "Arabic, right to left — a first-class layout, not a translation layer.", "desktop"),
    shot("crop-workload", "Team workload list showing open and late tasks per person.", "Team workload at a glance.", "detail"),
    shot("mobile-dashboard", "Dashboard on a phone with a bottom navigation bar.", "Mobile dashboard.", "mobile"),
    shot("mobile-project", "Project overview on a phone.", "Mobile project view.", "mobile"),
  ],
  caseStudy: {
    overview: [
      "Operra is a project-management workspace for creative and marketing agencies: clients, projects, reusable modules, tasks, client approvals, project and team chat, notifications, search and dashboards — in Arabic and English.",
      "It began as AgencyOS, the internal system for Fada, the content and marketing agency I run. Once it was replacing our own spreadsheets, I forked it into a white-label edition with no built-in brand, so another agency can put its own name, logo and colours on every screen, email and sign-in page.",
    ],
    problem: [
      "Our agency ran on Google Sheets. Every project was a tab, every approval was a WhatsApp message, and nobody could say at a glance which work was late, which was waiting on the client, and who was overloaded.",
      "Off-the-shelf tools didn't fit: they are English-first, treat right-to-left as an afterthought, and don't model the agency reality that a lot of work is blocked on client sign-off rather than on the team.",
    ],
    role: [
      "I was the client, the product owner and the builder. I defined the workflow model with the team, designed the interface and the Operra brand, built and deployed the application, and run its infrastructure. Implementation was AI-assisted; product, architecture and review were mine.",
    ],
    approach: [
      {
        title: "Model the agency's real workflow",
        body: "Clients → projects → modules → tasks. A module (e.g. “Content”, “Production”) is created from a template whose stages become tasks, and any stage can require client approval. “Waiting for client” is a first-class state, so delays are visible and attributable.",
      },
      {
        title: "One codebase, two run modes",
        body: "Without a flag it runs as a single agency's workspace; with it, it becomes a multi-tenant SaaS with self-serve signup, provisioning, plans and a control centre. Each customer can also get its own deployment and database.",
      },
      {
        title: "White-label as a system, not a theme",
        body: "A full palette is derived from two brand colours, logos are served per organisation, and product copy uses a {brand} placeholder — so the sidebar, sign-in, landing page, browser icon, emails and guide all follow the customer's brand.",
      },
      {
        title: "Ship with guard-rails",
        body: "CI runs migrations against Postgres, lint, type-checking, unit and database tests, a tenant-isolation check and a schema-drift check before anything builds. Security headers include a nonce-based Content Security Policy; two-factor authentication protects the control centre.",
      },
    ],
    build: [
      "Beyond the core workspace: calendars with iCal feeds, CSV reports and time tracking, a public landing page with a lead form, invitations, password reset and email verification, and billing that works with Stripe, Lemon Squeezy or manual bank transfer — currently running in manual mode.",
      "A separate marketing site presents the product in English and Arabic, illustrated only with real captures of the demo workspace.",
    ],
    deliverables: [
      "Internal workspace for Fada (AgencyOS)",
      "White-label edition with brand settings",
      "Multi-tenant platform mode with signup, plans and control centre",
      "Bilingual marketing site",
      "Deployment guide, CI pipeline and demo environment with reset",
    ],
    results: [
      "Deployed as Fada's own workspace, built to replace the agency's spreadsheets.",
      "White-label edition, platform and marketing site deployed on Vercel with separate databases per environment.",
    ],
    resultsPending:
      "No external customers yet; pricing and legal pages are still being finalised. The operra.com domain is not owned — the product currently lives on its deployment URLs.",
    lessons: [
      "Being my own first customer was the fastest feedback loop I've had — but generalising meant hunting down every place our agency's assumptions had leaked into the product.",
      "White-labelling touches far more than colours: emails, icons, legal pages, demo data and copy all needed a brand seam.",
    ],
    next: [
      "First external agencies on the platform",
      "Secure a product domain and move off deployment URLs",
      "Payment gateway once pricing is final",
    ],
  },
  verify: [
    "Confirm the demo and product-site URLs are public and up to date.",
    "If Fada's workspace is in day-to-day use, say so in results (currently only 'deployed' is claimed).",
    "Confirm you're happy to name Fada publicly as your agency.",
  ],
};

export default project;
