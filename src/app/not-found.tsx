import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-[clamp(3rem,9vw,7rem)]">
        This page doesn&rsquo;t <em>exist.</em>
      </h1>
      <p className="mt-6 max-w-[40ch] text-ink-2">It may have moved, or the link may be wrong.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          See the work
        </ButtonLink>
      </div>
    </div>
  );
}
