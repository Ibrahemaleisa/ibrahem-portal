import { isPending, showDraftNotes } from "@/lib/pending";
import type { Maybe } from "@/lib/types";

/**
 * Renders a possibly-unverified value. Pending values become a visible
 * "to confirm" marker in draft mode, and nothing at all once drafts are off.
 */
export function Value<T>({
  value,
  render,
}: {
  value: Maybe<T>;
  render?: (v: T) => React.ReactNode;
}) {
  if (isPending(value)) {
    if (!showDraftNotes) return null;
    return (
      <span className="tbc" title={value.note}>
        <span aria-hidden>◌</span> To confirm: {value.note}
      </span>
    );
  }
  return <>{render ? render(value) : String(value)}</>;
}
