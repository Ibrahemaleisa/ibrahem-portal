"use client";

import Script from "next/script";
import { useId, useState } from "react";
import { budgetRanges, contactLimits, projectTypes } from "@/content/contact";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const field =
  "mt-2 block w-full rounded-none border-0 border-b border-rule-strong bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink-3 focus:border-ink focus:ring-0 focus:outline-none aria-[invalid=true]:border-accent";

export function ContactForm({ fallback }: { fallback?: React.ReactNode }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useId();

  function validate(data: FormData) {
    const e: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    if (!name) e.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address.";
    if (!data.get("projectType")) e.projectType = "Please choose the closest project type.";
    if (description.length < contactLimits.minDescription)
      e.description = `A couple of sentences helps — at least ${contactLimits.minDescription} characters.`;
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      // Only a confirmed delivery counts as success.
      if (res.ok && body?.ok === true) {
        setStatus({ state: "sent" });
        form.reset();
        return;
      }
      const message =
        res.status === 503 || res.status === 404
          ? "The inquiry form isn’t connected on this deployment yet, so your message was not sent."
          : body?.error || "Something went wrong and your message was not sent.";
      setStatus({ state: "error", message });
    } catch {
      setStatus({ state: "error", message: "Couldn’t reach the server — check your connection. Your message was not sent." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="border-t border-ink pt-8">
        <p className="eyebrow text-ink">Message delivered</p>
        <p className="display mt-4 text-[clamp(2rem,4vw,3rem)]">Thank you — I&rsquo;ve got it.</p>
        <p className="mt-4 max-w-[46ch] text-ink-2">
          I read every inquiry myself and will reply by email.
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="link-under mt-8 text-sm">
          Send another message
        </button>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-err`} className="mt-2 text-sm text-accent">
        {errors[name]}
      </p>
    ) : null;
  const a11y = (name: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10" aria-describedby={`${id}-note`}>
      {turnstileKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      <div className="grid gap-10 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Name</span>
          <input name="name" autoComplete="name" maxLength={contactLimits.name} required className={field} {...a11y("name")} />
          {err("name")}
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={contactLimits.email}
            required
            className={field}
            {...a11y("email")}
          />
          {err("email")}
        </label>
      </div>

      <fieldset {...a11y("projectType")}>
        <legend className="eyebrow">Project type</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="projectType" value={t} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-full border border-rule-strong px-4 text-sm text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-ink">
                {t}
              </span>
            </label>
          ))}
        </div>
        {err("projectType")}
      </fieldset>

      <label className="block">
        <span className="eyebrow">
          Budget range <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <select name="budget" defaultValue="" className={`${field} appearance-none`}>
          <option value="">Prefer not to say</option>
          {budgetRanges.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="eyebrow">Project description</span>
        <textarea
          name="description"
          rows={6}
          maxLength={contactLimits.description}
          required
          placeholder="What are you trying to achieve, what exists today, and is there a deadline?"
          className={`${field} resize-y leading-relaxed`}
          {...a11y("description")}
        />
        {err("description")}
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileKey && <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="auto" />}

      <div className="flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="max-w-[40ch] text-sm text-ink-3">
          Your details are used only to reply to this inquiry.
        </p>
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-ink px-7 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent hover:text-on-accent disabled:cursor-wait disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send inquiry"}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <div aria-live="assertive">
        {status.state === "error" && (
          <div role="alert" className="border-l-2 border-accent pl-4">
            <p className="font-medium">{status.message}</p>
            {fallback && <div className="mt-2 text-sm text-ink-2">{fallback}</div>}
          </div>
        )}
      </div>
    </form>
  );
}
