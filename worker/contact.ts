/**
 * POST /api/contact — called from worker/index.ts
 *
 * Validates a project inquiry and delivers it by email through Resend.
 * It only answers { ok: true } after Resend has accepted the message, and
 * answers 503 when the required settings are missing — so the site can never
 * show a false "sent" message.
 *
 * Settings (Cloudflare → Workers & Pages → this Worker → Settings → Variables and Secrets):
 *   RESEND_API_KEY        secret   Resend API key
 *   CONTACT_TO_EMAIL      plain    where inquiries are delivered
 *   CONTACT_FROM_EMAIL    plain    verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *   TURNSTILE_SECRET_KEY  secret   optional; when set, a Turnstile token is required
 */

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

const LIMITS = { name: 120, email: 200, projectType: 80, budget: 80, description: 5000, minDescription: 20 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function readBody(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const data = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, typeof v === "string" ? v : ""]));
  }
  const form = await request.formData();
  return Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
}

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  // Same-origin only.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { ok: false, error: "Cross-origin requests are not allowed." });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json(503, { ok: false, code: "not_configured", error: "The inquiry form is not configured yet." });
  }

  let data: Record<string, string>;
  try {
    data = await readBody(request);
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  // Honeypot filled → pretend nothing happened, but don't claim delivery.
  if (data.company_website) return json(400, { ok: false, error: "Your message could not be sent." });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const projectType = (data.projectType ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const description = (data.description ?? "").trim();

  if (!name || name.length > LIMITS.name) return json(422, { ok: false, error: "Please enter your name." });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return json(422, { ok: false, error: "Please enter a valid email address." });
  if (!projectType || projectType.length > LIMITS.projectType) return json(422, { ok: false, error: "Please choose a project type." });
  if (budget.length > LIMITS.budget) return json(422, { ok: false, error: "Invalid budget value." });
  if (description.length < LIMITS.minDescription || description.length > LIMITS.description)
    return json(422, { ok: false, error: "Please describe the project in a few sentences." });

  if (env.TURNSTILE_SECRET_KEY) {
    const token = data["cf-turnstile-response"] ?? "";
    const ok =
      token &&
      (await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request.headers.get("cf-connecting-ip")).catch(() => false));
    if (!ok) return json(422, { ok: false, error: "Please complete the verification and try again." });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType],
    ["Budget", budget || "Not given"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${description}`;
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#777">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(description)}</p>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New inquiry: ${projectType} — ${name}`.slice(0, 200),
        text,
        html,
      }),
    });
  } catch (error) {
    console.error("Resend unreachable", error);
    return json(502, { ok: false, error: "The message could not be delivered. Please try again later." });
  }

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json(502, { ok: false, error: "The message could not be delivered. Please try again later." });
  }
  return json(200, { ok: true });
}
