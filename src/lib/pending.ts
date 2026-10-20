import type { Maybe, Pending } from "./types";

export const pending = (note: string): Pending => ({ pending: true, note });

export const isPending = <T,>(value: Maybe<T>): value is Pending =>
  typeof value === "object" && value !== null && "pending" in value && value.pending === true;

/** Draft markers are on unless explicitly disabled for the public launch. */
export const showDraftNotes = process.env.NEXT_PUBLIC_SHOW_DRAFT_NOTES !== "false";
