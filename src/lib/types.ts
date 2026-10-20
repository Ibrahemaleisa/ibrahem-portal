/**
 * Content model for the portfolio. Everything a visitor reads lives in
 * src/content/* as plain typed data; components only present it.
 */

/** Honest maturity of a piece of work. Rendered on every card and case study. */
export type ProjectStatus = "completed" | "prototype" | "in-development" | "concept";

export type Category =
  | "Digital products"
  | "Business systems"
  | "Websites & storefronts"
  | "Experiments";

/**
 * A value that has not been verified yet. Rendered as a visible
 * "to confirm" marker while NEXT_PUBLIC_SHOW_DRAFT_NOTES is on, and hidden
 * entirely when it is off — never presented as fact.
 */
export type Pending = { pending: true; note: string };
export type Maybe<T> = T | Pending;

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "demo" | "repo" | "site";
  /** Set when the URL could not be checked at build time; flagged in draft mode. */
  unverified?: boolean;
};

export type Media = {
  /** Path under /public, e.g. /work/operra/dashboard.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Layout hint for galleries. */
  frame?: "desktop" | "mobile" | "detail";
};

/** A decision worth explaining: what was chosen and why. */
export type Decision = { title: string; body: string };

export type Fact = { label: string; value: string };

export type CaseStudy = {
  overview: string[];
  problem: string[];
  role: string[];
  approach: Decision[];
  build: string[];
  deliverables: string[];
  /** Only outcomes that can be shown. Leave empty and use resultsPending otherwise. */
  results: string[];
  resultsPending?: string;
  lessons: string[];
  next: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Arabic name, when the product has one. */
  titleAr?: string;
  /** One line, shown under the title. */
  tagline: string;
  /** Two or three sentences for cards and meta descriptions. */
  summary: string;
  categories: Category[];
  status: ProjectStatus;
  /** Short qualifier next to the status, e.g. "Deployed demo". */
  statusNote?: string;
  /** Display period, e.g. "Sep – Oct 2026". */
  period: string;
  /** Sort key: ISO month of the latest work. */
  updated: string;
  context: string;
  role: string[];
  /** Only technologies verified in the source. */
  stack: string[];
  facts: Fact[];
  links: ProjectLink[];
  featured: boolean;
  /** Visual identity used for the generated cover when no screenshot exists. */
  cover: {
    tone: "ink" | "paper" | "accent" | "moss" | "lapis";
    /** Real module / component names drawn as the cover's schematic. */
    modules: string[];
    image?: Media;
  };
  gallery: Media[];
  /** Screens we know exist but don't have captures of yet. Rendered as labelled placeholders. */
  galleryPending?: string[];
  caseStudy: CaseStudy;
  /** Internal checklist of facts to confirm before launch. Shown in draft mode only. */
  verify?: string[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  /** Slugs of projects that evidence this capability. */
  evidence: string[];
};

export type Experience = {
  organisation: string;
  role: Maybe<string>;
  period: Maybe<string>;
  summary: Maybe<string>;
};
