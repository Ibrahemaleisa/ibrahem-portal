import type { Category, Project, ProjectStatus } from "@/lib/types";
import operraEventsOs from "./operra-events-os";
import operra from "./operra";
import sukan from "./sukan";
import luxe from "./luxe-salla-theme";
import storefrontStudies from "./storefront-studies";

/**
 * To add a project: create a file next to this one (copy an existing one),
 * then add it to this list. Order here is the order on the site.
 */
export const projects: Project[] = [operra, operraEventsOs, sukan, luxe, storefrontStudies];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured);

export const categories: Category[] = [
  "Digital products",
  "Business systems",
  "Websites & storefronts",
  "Experiments",
];

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  prototype: "Working prototype",
  "in-development": "In development",
  concept: "Concept / experiment",
};

export const adjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return { next: projects[(i + 1) % projects.length] };
};
