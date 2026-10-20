import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Value } from "@/components/value";
import { site } from "@/content/site";
import { isPending } from "@/lib/pending";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Ibrahim Al-Eisa — websites, digital products, internal tools and business systems.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = isPending(site.email) ? null : site.email;
  const fallback = email ? (
    <>
      You can email me directly at{" "}
      <a href={`mailto:${email}`} className="link-under">
        {email}
      </a>
      .
    </>
  ) : (
    <>
      Please reach me through{" "}
      <a href={site.social[0].href} className="link-under" target="_blank" rel="noopener">
        {site.social[0].label}
      </a>{" "}
      in the meantime.
    </>
  );

  return (
    <div className="wrap pt-14 md:pt-24">
      <div className="grid-12 gap-y-14">
        <header className="col-span-4 md:col-span-5">
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-8 text-[clamp(3rem,7.5vw,6.5rem)]">
            Let&rsquo;s build <em>something useful.</em>
          </h1>
          <p className="mt-8 max-w-[40ch] text-lg text-ink-2">
            Tell me about the business, the problem and what a good outcome looks like. A few honest sentences are better than a
            perfect brief.
          </p>
          <dl className="mt-12 text-sm">
            <div className="border-t border-rule py-4">
              <dt className="eyebrow mb-1">Email</dt>
              <dd>
                <Value
                  value={site.email}
                  render={(e) => (
                    <a href={`mailto:${e}`} className="link-under">
                      {e}
                    </a>
                  )}
                />
              </dd>
            </div>
            <div className="border-t border-rule py-4">
              <dt className="eyebrow mb-1">Based in</dt>
              <dd>
                <Value value={site.location} />
              </dd>
            </div>
            <div className="border-t border-rule py-4">
              <dt className="eyebrow mb-1">Languages</dt>
              <dd>
                English · <span lang="ar">العربية</span>
              </dd>
            </div>
          </dl>
        </header>
        <div className="col-span-4 md:col-span-6 md:col-start-7 md:pt-24">
          <ContactForm fallback={fallback} />
        </div>
      </div>
    </div>
  );
}
