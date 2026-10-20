import { pending } from "@/lib/pending";
import type { Experience } from "@/lib/types";

export const about = {
  intro: [
    "I'm Ibrahim Al-Eisa. I work where business operations and software meet: I understand how a company actually runs, and I can build the product, the website or the internal system that makes it run better.",
    "Most of what I build starts from something real — my own agency's spreadsheets, an event team's guest lists, a housing market that runs on group chats. I like problems with constraints: sensitive data, two languages, people in the field with bad signal, and clients who need to approve everything.",
  ],
  principles: [
    {
      title: "Business first, then software",
      body: "I start with how the work flows and where it breaks. Sometimes the answer is a process change, not an app.",
    },
    {
      title: "Systems over screens",
      body: "Permissions, data models, approvals and failure cases are where products succeed or fail. I design those first.",
    },
    {
      title: "Arabic-first by default",
      body: "Everything I build works right-to-left and in English from day one — dates, numbers, phone formats and all.",
    },
    {
      title: "Honest scope",
      body: "I say what's done, what's a prototype and what's next — in proposals and on this site.",
    },
    {
      title: "Modern tools, owned decisions",
      body: "I use AI-assisted development deliberately to move faster. Product decisions, architecture, review and testing stay with me.",
    },
  ],
};

/**
 * Supporting credibility only. Fill in roles and periods; anything left
 * pending is shown as "to confirm" in draft mode and hidden at launch.
 */
export const experience: Experience[] = [
  {
    organisation: "Fada",
    role: pending("Your title at Fada — e.g. Founder"),
    period: pending("Years"),
    summary: "Creative content and marketing agency. I built and run its internal operations platform.",
  },
  {
    organisation: "Tamara",
    role: pending("Role / team"),
    period: pending("Dates"),
    summary: pending("One line on the relevant work — no confidential details."),
  },
  {
    organisation: "Careem",
    role: pending("Role / team"),
    period: pending("Dates"),
    summary: pending("One line on the relevant work."),
  },
  {
    organisation: "Rila",
    role: pending("Role / team"),
    period: pending("Dates"),
    summary: pending("One line on the relevant work."),
  },
];

export const education = pending("Degree, university and year (optional).");
