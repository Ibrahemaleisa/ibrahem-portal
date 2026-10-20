import type { Project } from "@/lib/types";

const project: Project = {
  slug: "operra-events-os",
  title: "Operra Events OS",
  titleAr: "أوبيرّا للفعاليات",
  tagline: "An operations system for Saudi event, protocol and exhibition agencies.",
  summary:
    "A multi-tenant, Arabic-first platform that runs the whole life of an event agency's work — projects built from templates, VIP invitation delivery with an offline driver app, digital RSVPs, protocol, booth production, vendors and finance.",
  categories: ["Business systems", "Digital products"],
  status: "prototype",
  statusNote: "Feature-complete MVP · deployed demo",
  period: "2026",
  updated: "2026-10",
  context: "Independent product",
  role: ["Product definition", "Domain modelling", "Architecture", "Full-stack build", "Testing"],
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "PostgreSQL 16 + row-level security",
    "Prisma 7",
    "BullMQ / Redis",
    "Tailwind CSS 4",
    "Zod",
    "Vitest",
    "Playwright",
    "PWA (service worker + IndexedDB)",
  ],
  facts: [
    { label: "Data model", value: "87 models, 30 enums" },
    { label: "User types", value: "7 — staff, field agents, clients, vendors, guests" },
    { label: "Isolation", value: "Enforced by Postgres RLS" },
    { label: "Tests", value: "Unit, RLS integration & end-to-end" },
  ],
  links: [{ label: "Source", href: "https://github.com/Ibrahemaleisa/Opera-OS", kind: "repo" }],
  featured: true,
  cover: {
    tone: "ink",
    modules: [
      "Projects",
      "Templates",
      "VIP delivery",
      "Import Studio",
      "Driver PWA",
      "Invitations · RSVP",
      "Protocol",
      "Booth production",
      "Vendors",
      "Finance",
      "Client portal",
    ],
  },
  gallery: [],
  galleryPending: [
    "Project overview composed from templates",
    "Excel Import Studio — column mapping and duplicate review",
    "Driver PWA on a phone, offline",
    "Event command center",
    "Client approval portal",
  ],
  caseStudy: {
    overview: [
      "Event and protocol agencies in Saudi Arabia run some of the most operationally intense work there is: hundreds of hand-delivered VIP invitations, guest lists that must stay private, booths built against a deadline, and clients who need to approve everything. Most of it is coordinated through spreadsheets and chat groups.",
      "Operra Events OS is a single system for that work. One deployment serves many agencies, each isolated at the database level, and every screen works in Arabic (right-to-left) and English.",
    ],
    problem: [
      "The data in this business is unusually sensitive — VIP names, honorifics, mobile numbers and addresses, protocol notes, contracts and financial records — and it moves between office staff, freelancers, drivers, clients and vendors. A leak between agencies, or a driver seeing more than their route, is not a minor bug.",
      "At the same time the work is physical and messy: guest lists arrive as Excel files in mixed Arabic and English, phone numbers come in every format, and drivers lose signal in car parks and basements.",
    ],
    role: [
      "Independent product: I defined the product, wrote the specification, modelled the domain and owned every architecture decision. Implementation was AI-assisted; I directed it, reviewed it and verified it against the test suite.",
    ],
    approach: [
      {
        title: "Tenant isolation in the database, not just the app",
        body: "Every table with an organisation column has Postgres row-level security enabled and forced. The application connects as a role that cannot bypass it, and each transaction sets the tenant explicitly. A missing filter in application code returns nothing, rather than another agency's data.",
      },
      {
        title: "Three layers of permission",
        body: "Organisation role, then project membership, then record scope. Records a user cannot see return 404 instead of 403, so their existence isn't revealed. VIP contact details are masked by default and revealing them is audited.",
      },
      {
        title: "An import studio built for real spreadsheets",
        body: "Guest lists are normalised on the way in: Arabic-Indic digits converted, Saudi mobiles formatted to E.164, duplicates detected. Imports commit in idempotent chunks and can be rolled back.",
      },
      {
        title: "A driver app that assumes no signal",
        body: "The field PWA queues proof-of-delivery in IndexedDB and replays it idempotently when the connection returns, reporting conflicts instead of overwriting. The service worker never caches API responses, because they contain personal data.",
      },
      {
        title: "Four-eyes approval where money or reputation is at stake",
        body: "Bulk invitation campaigns, purchase orders above a configurable threshold, expenses and change orders all require a second person to approve.",
      },
    ],
    build: [
      "The system covers projects composed from bilingual templates, tasks and approvals; VIP delivery with a 10-state delivery lifecycle, dispatch and analytics; digital invitations with RSVP pages, opt-out and QR check-in; event operations and VIP protocol; booth and pavilion production; vendors, procurement and finance; and portals for clients and vendors.",
      "Dates and money follow local conventions — Asia/Riyadh time, Saudi riyals and Hijri (Umm al-Qura) dates — and layouts use logical CSS properties so the interface mirrors cleanly between Arabic and English.",
    ],
    deliverables: [
      "Multi-tenant web application with seven user types",
      "Offline-capable driver PWA",
      "Client, vendor and guest (RSVP) portals",
      "Background worker and scheduled jobs",
      "Docker Compose stack and a documented Vercel + Neon deployment",
      "Product spec, architecture, data model and security documentation",
      "Automated tests: unit, database-level tenancy and end-to-end",
    ],
    results: [
      "All seven planned build phases are implemented and documented, with a list of precisely-scoped remaining items.",
      "Cross-tenant isolation is covered by integration tests that run against a real Postgres with RLS enabled.",
    ],
    resultsPending:
      "Not yet used by a paying agency. Live SMS / WhatsApp / email adapters are written but have not been exercised with real provider credentials — the demo runs in simulation mode.",
    lessons: [
      "Putting the security boundary in the database made every later module cheaper: new features inherit isolation instead of re-implementing it.",
      "Writing the threat model before the screens changed the product — masked contacts, audited reveals and approval gates came from it, not from a feature list.",
    ],
    next: [
      "Password reset, email verification and MFA",
      "A visual builder for automation rules (rules can currently only be toggled)",
      "Retention enforcement and data-subject export for Saudi PDPL",
      "Pilot with a real agency and verified messaging providers",
    ],
  },
  verify: [
    "Live demo URL (opera-os-alpha.vercel.app) appears to be protected — decide whether to share a public demo link.",
    "Add authentic screenshots from the demo (see galleryPending).",
    "Confirm how you want AI-assisted development described.",
    "Start month of the project.",
  ],
};

export default project;
