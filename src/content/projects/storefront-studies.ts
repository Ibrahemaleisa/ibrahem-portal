import type { Project } from "@/lib/types";

const project: Project = {
  slug: "storefront-studies",
  title: "Storefront studies",
  tagline: "Short experiments in e-commerce design and stack choices.",
  summary:
    "A set of quick studies for fashion and streetwear storefronts: a static dark-minimal concept, a headless Next.js store with Firebase and Stripe, and Liquid and Salla theme starters. Kept as experiments, not products.",
  categories: ["Websites & storefronts", "Experiments"],
  status: "concept",
  statusNote: "Experiments",
  period: "Apr 2026",
  updated: "2026-04",
  context: "Personal experiments",
  role: ["Design exploration", "Prototyping"],
  stack: ["HTML / CSS / JS", "Next.js 14", "Firebase", "Stripe", "Liquid", "Salla Twilight"],
  facts: [],
  links: [],
  featured: false,
  cover: { tone: "lapis", modules: ["Static concept", "Headless store", "Liquid theme", "Salla starters"] },
  gallery: [],
  galleryPending: ["Static streetwear concept (desktop + mobile)"],
  caseStudy: {
    overview: [
      "Before committing to a full storefront theme, I ran several small studies to compare approaches: a single-file static concept for a dark, minimal streetwear brand; a headless store in Next.js with Firebase and Stripe; a Liquid theme; and Salla theme starters.",
    ],
    problem: ["Choosing between a hosted platform theme and a custom headless store is a business decision as much as a technical one — cost, control, payments and who maintains it."],
    role: ["Personal experiments."],
    approach: [
      {
        title: "Same brief, different stacks",
        body: "Running the same visual brief through different stacks made the trade-offs concrete: a hosted platform wins on payments, operations and cost for most Saudi merchants; headless only pays off with specific needs.",
      },
    ],
    build: ["These are intentionally unfinished. The lessons fed directly into the Luxe theme."],
    deliverables: ["Static concept page", "Partial headless store", "Theme starters"],
    results: [],
    resultsPending: "Experiments only — none are live stores.",
    lessons: ["For most merchants, the right answer is a well-built theme on the platform they already use."],
    next: [],
  },
};

export default project;
