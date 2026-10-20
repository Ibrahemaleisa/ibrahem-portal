import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "website-improvement",
    title: "Website review & improvement",
    summary:
      "An honest audit of an existing site — content, structure, speed, accessibility, SEO basics and Arabic/English quality — followed by the fixes, the rewrite or the rebuild it actually needs.",
    includes: [
      "Audit report with prioritised findings",
      "Content and structure updates",
      "Performance and accessibility fixes",
      "Arabic / RTL corrections",
      "Publishing, domain and hosting set-up",
    ],
    evidence: ["operra", "luxe-salla-theme"],
  },
  {
    id: "websites",
    title: "Websites & storefronts",
    summary:
      "Fast, bilingual marketing sites and Salla storefronts designed around what the business needs a visitor to do — built to be easy to update after hand-over.",
    includes: ["Company and product sites", "Landing pages with lead capture", "Salla themes and customisation", "CMS-free content structure that's easy to edit"],
    evidence: ["operra", "luxe-salla-theme", "sukan"],
  },
  {
    id: "products",
    title: "Digital products & MVPs",
    summary:
      "From an idea or a spreadsheet to a working product: scoping, product definition, design and a production-grade first version you can put in front of users.",
    includes: ["Product scoping and requirements", "UX and interface design", "Full-stack web application", "Authentication, roles and multi-tenancy", "Deployment and hand-over"],
    evidence: ["operra", "operra-events-os", "sukan"],
  },
  {
    id: "systems",
    title: "Internal tools, dashboards & automation",
    summary:
      "Replace the spreadsheets and chat threads a team runs on with a system: dashboards, approval flows, imports, notifications and reports that fit how the work is actually done.",
    includes: ["Operational dashboards", "Approval and workflow systems", "Excel / CSV import and export", "Email and in-app notifications", "Scheduled jobs and automations"],
    evidence: ["operra", "operra-events-os"],
  },
  {
    id: "analysis",
    title: "Process design & business analysis",
    summary:
      "Before any software: mapping how work flows today, where it breaks, and what a better process looks like — written up so it can be implemented with or without me.",
    includes: ["Process mapping", "Requirements and specifications", "Data and permissions modelling", "Build-vs-buy recommendations"],
    evidence: ["operra-events-os", "sukan"],
  },
];

export const engagementSteps = [
  { title: "Conversation", body: "A short call to understand the business, the problem and what success looks like." },
  { title: "Written proposal", body: "Scope, deliverables, timeline and price in writing — including what is out of scope." },
  { title: "Build in the open", body: "Working software early, regular check-ins, and a staging link you can click through at every stage." },
  { title: "Hand-over", body: "Deployment on infrastructure you own, documentation, and a walkthrough so your team can run it." },
];
