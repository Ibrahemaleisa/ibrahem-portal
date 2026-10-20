export const projectTypes = [
  "Website review & improvement",
  "New website or storefront",
  "Digital product / MVP",
  "Internal tool, dashboard or automation",
  "Process design / business analysis",
  "Something else",
] as const;

/** Edit freely — these are only used to route the conversation. */
export const budgetRanges = [
  "Under SAR 10,000",
  "SAR 10,000 – 25,000",
  "SAR 25,000 – 60,000",
  "Over SAR 60,000",
  "Not sure yet",
] as const;

export const contactLimits = { name: 120, email: 200, description: 5000, minDescription: 20 } as const;
