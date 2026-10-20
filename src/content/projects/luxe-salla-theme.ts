import type { Project } from "@/lib/types";

const project: Project = {
  slug: "luxe-salla-theme",
  title: "Luxe",
  titleAr: "لاكس",
  tagline: "An Arabic-first storefront theme for Salla, Saudi Arabia's e-commerce platform.",
  summary:
    "A complete, configurable theme for Salla's Twilight engine: header, cart drawer, home-page sections, product, blog, customer and error pages — right-to-left first, with dark mode and merchant settings.",
  categories: ["Websites & storefronts"],
  status: "prototype",
  statusNote: "Theme built · not yet published",
  period: "Apr – Jun 2026",
  updated: "2026-06",
  context: "Independent product",
  role: ["Storefront design", "Theme development"],
  stack: ["Salla Twilight", "Twig", "Tailwind CSS", "Webpack", "JavaScript"],
  facts: [
    { label: "Templates", value: "43 Twig views" },
    { label: "Direction", value: "RTL first, LTR supported" },
  ],
  links: [{ label: "Source", href: "https://github.com/Ibrahemaleisa/salla-theme-luxe", kind: "repo" }],
  featured: false,
  cover: {
    tone: "accent",
    modules: ["Header", "Hero", "Countdown", "Brands", "Product", "Cart drawer", "Blog", "Account"],
  },
  gallery: [],
  galleryPending: ["Home page (desktop)", "Product page", "Cart drawer on mobile", "Theme settings in the Salla dashboard"],
  caseStudy: {
    overview: [
      "Luxe is a storefront theme for Salla, the platform a large share of Saudi online stores run on. It is designed for premium, fashion-led brands and built Arabic-first.",
      "Before it, I worked through several Salla starter themes and storefront studies; Luxe is where those came together into one complete theme.",
    ],
    problem: [
      "Many Salla stores use themes designed left-to-right and mirrored afterwards, which shows in spacing, typography and icon direction. Merchants also need to change content and sections themselves, without a developer.",
    ],
    role: ["Independent: design direction and theme development."],
    approach: [
      {
        title: "Right-to-left as the default",
        body: "Layouts, spacing and component order are designed for Arabic first; English is the variation.",
      },
      {
        title: "Merchant-editable sections",
        body: "Home-page sections — hero, countdown, brands and more — are configured from Salla's theme settings, so the store owner controls content and order.",
      },
      {
        title: "Debugging the platform contract",
        body: "Salla validates theme settings strictly. A recurring JSON error was traced to the settings schema itself and fixed at the root rather than worked around.",
      },
    ],
    build: [
      "The theme covers the header and footer, cart drawer, home-page sections, product and listing pages, blog, customer account pages and 404/500 pages, styled with Tailwind and bundled with Webpack.",
    ],
    deliverables: ["Complete Twilight theme source", "Configurable home-page sections", "Dark mode"],
    results: [],
    resultsPending: "Not yet published to the Salla theme store or installed on a live store.",
    lessons: ["Platform constraints are part of the design brief — reading the platform's validation rules early saves days later."],
    next: ["Install on a demo store and capture screenshots", "Accessibility pass", "Submit to the Salla theme marketplace"],
  },
  verify: ["Screenshots from a Salla demo store.", "Confirm intended commercial licence / publishing plan."],
};

export default project;
