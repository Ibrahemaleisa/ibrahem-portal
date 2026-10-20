# Ibrahim Al-Eisa — portfolio

Personal freelance portfolio: home, work index with filtering, a reusable case-study template, services, about and a working project-inquiry form.

- **Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4
- **Hosting:** Cloudflare Pages (static files + one Pages Function for the contact form)
- **Runtime dependencies:** `next`, `react`, `react-dom`. Nothing else ships to the browser.

```bash
npm install
npm run dev            # http://localhost:3000 (the contact form shows "not connected" here — expected)
npm run build          # static site in ./out
npm run preview        # build + run ./out with the contact function via wrangler (http://localhost:8788)
npm run check:content  # validate content + print everything still marked "to confirm"
npm run lint && npm run typecheck
```

Node 22+ is required.

---

## How the content works

All copy and project data lives in `src/content/` as typed data. Components never contain portfolio content.

| File | What it holds |
|---|---|
| `src/content/site.ts` | Name, headline, intro, location, availability, email, social links, nav |
| `src/content/projects/*.ts` | One file per project, including its full case study |
| `src/content/projects/index.ts` | Which projects appear, in what order |
| `src/content/services.ts` | Services and engagement steps; each service links to the projects that evidence it |
| `src/content/about.ts` | About text, principles, experience, education |
| `src/content/contact.ts` | Project types and budget ranges in the form |
| `src/lib/types.ts` | The content model (what fields a project has) |

### Add a project

1. Copy an existing file in `src/content/projects/` (e.g. `luxe-salla-theme.ts`) to `my-project.ts` and change the `slug`.
2. Fill in the fields. The case study sections (overview → lessons) render automatically.
3. Add it to the `projects` array in `src/content/projects/index.ts`.
4. Run `npm run check:content`.

The page is created at `/work/<slug>` with its own metadata, Open Graph image and sitemap entry.

### Add screenshots

1. Put images in `public/work/<slug>/`. Use WebP, about 1600px wide, and authentic captures only.
2. Add them to the project's `gallery` with `src`, `alt`, `width`, `height` and an optional `caption`. Use `frame: "mobile"` for phone captures.
3. Set `cover.image` to use one as the project cover. Without one, the cover is a typographic map drawn from the project's real module names. It is never a fake screenshot.
4. Remove the matching line from `galleryPending`.

A quick conversion: `convert shot.png -resize '1600x>' -quality 82 public/work/<slug>/shot.webp` (ImageMagick).

### Project status

Every project carries one honest status: `completed`, `prototype` (working prototype), `in-development` or `concept`. `npm run check:content` fails if a project is marked `completed` without any verified results.

### Draft markers

Unverified values are written as `pending("what to confirm")`, for example a job title or availability.

- **While `NEXT_PUBLIC_SHOW_DRAFT_NOTES` is not `false` (the default):** each pending value shows as a dashed **"To confirm"** marker, and every case study ends with its checklist.
- **When you set it to `false`:** all markers, checklists, "screenshot pending" frames and unconfirmed experience entries disappear. Nothing unverified is shown as fact.

Before launch, replace the pending values you can, then set `NEXT_PUBLIC_SHOW_DRAFT_NOTES=false` in the production environment.

---

## Contact form

The form posts JSON to `/api/contact`. That endpoint is handled by `functions/api/contact.ts`, a Cloudflare Pages Function that:

- validates the input, checks the request is same-origin, and catches bots with a honeypot field;
- optionally verifies Cloudflare Turnstile;
- sends the inquiry through [Resend](https://resend.com), with `reply_to` set to the sender.

It returns `{ ok: true }` **only after Resend accepts the email**. When it isn't configured it returns `503`, and the form says plainly that the message was **not** sent, then points visitors to your fallback contact. A false success message is impossible by design.

### Set up email delivery

1. Create a Resend account, add and verify your domain, and create an API key.
2. In **Cloudflare Pages → your project → Settings → Variables and Secrets** (Production, and Preview if you want it), add:

| Name | Type | Example |
|---|---|---|
| `RESEND_API_KEY` | Secret | `re_…` |
| `CONTACT_TO_EMAIL` | Text | the inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | Text | `Portfolio <hello@yourdomain.com>` (must be on the verified domain) |
| `TURNSTILE_SECRET_KEY` | Secret, optional | from Cloudflare Turnstile |

3. Redeploy, then send yourself a test inquiry.

**Optional spam protection:** create a Turnstile widget for your domain. Put the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (a build variable) and the secret in `TURNSTILE_SECRET_KEY`.

**To test locally:** copy `.dev.vars.example` to `.dev.vars`, fill it in, then run `npm run preview`.

**To use a different form service** (Formspree, Basin, your own API): set `NEXT_PUBLIC_CONTACT_ENDPOINT` to its URL. The endpoint must answer `{ "ok": true }` with a 2xx on success; anything else is shown as a failure.

---

## Deploying to Cloudflare Pages

The site uses Next.js **static export** (`output: "export"`). Static export works with Cloudflare Pages without any adapter, because every page is pre-rendered at build time.

Features that need a Node server are deliberately not used: next/image optimisation, middleware, ISR and route handlers. Images ship pre-sized, with `images.unoptimized`. If you later need server features, switch to `@opennextjs/cloudflare` (Workers).

### Option A: Git integration (recommended)

1. Push this repo to GitHub.
2. Go to Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings:
   - Framework preset: *None*
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `22`
4. Add build variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (used for canonical URLs, the sitemap and Open Graph)
   - `NEXT_PUBLIC_SHOW_DRAFT_NOTES` = `false` (when you're ready)
5. Add the contact secrets from the table above.
6. Deploy. The `functions/` folder is picked up automatically, and every push to the main branch redeploys.

### Option B: CLI

```bash
npx wrangler login
npm run deploy        # next build && wrangler pages deploy out
```

`wrangler.toml` holds the project name and output directory.

### Custom domain, DNS and HTTPS

1. **Pages project → Custom domains → Set up a domain.** Enter `yourdomain.com`, and optionally `www.yourdomain.com`.
2. If the domain's DNS is on Cloudflare, the records are created for you. Otherwise add a `CNAME` from `www` (or the apex, if your DNS provider supports CNAME flattening or ALIAS) to `<project>.pages.dev`.
3. Cloudflare issues and renews the HTTPS certificate automatically. Then enable **Always Use HTTPS** under SSL/TLS → Edge Certificates.
4. Redirect `www` → apex (or the reverse) with a Bulk Redirect or Redirect Rule.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

Security headers and caching rules live in `public/_headers`.

### Linking live projects

Each project has its own case study at `/work/<slug>`. Live apps and demos are attached as `links` on the project. They can live anywhere:

| Kind of project | Suggested home | How |
|---|---|---|
| Vercel apps (Operra, Operra Events OS) | `operra.yourdomain.com`, `events.yourdomain.com` | Vercel project → Domains → add the subdomain, then add the `CNAME` it shows in your DNS (`cname.vercel-dns.com`). |
| Static prototypes (e.g. Sukan's waitlist page) | `sukan.yourdomain.com` or a separate Pages project | Create a second Cloudflare Pages project from that repo or folder, then add it as a custom domain. Free tier. |
| Salla themes | Salla demo store URL | Link the demo store. |

None of this needs paid infrastructure: Cloudflare Pages (free), Vercel Hobby and Resend's free tier cover it. Do not buy domains or point DNS until you've decided on names.

---

## Project structure

```
src/
  app/                 routes: /, /work, /work/[slug], /services, /about, /contact
                       plus sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found
  components/          presentation only (cover, card, status badge, form, header/footer…)
  content/             all copy and project data
  lib/                 types, draft helpers, OG card renderer
functions/api/contact.ts   Cloudflare Pages Function (contact delivery)
public/work/<slug>/        project images
public/_headers            security + caching headers
scripts/check-content.ts   content validation + launch checklist
```

**Design system ("Ledger"):** warm paper, ink and one oxide accent, defined as CSS variables in `src/app/globals.css` with an automatic dark mode. Typography is Newsreader (display), Schibsted Grotesk (text), IBM Plex Mono (metadata) and IBM Plex Sans Arabic. Hairline rules and a 12-column grid carry the structure. Motion is limited to CSS scroll reveals and hover states, and respects `prefers-reduced-motion`.

---

## Missing assets and information

Run `npm run check:content` for the full, current list. In summary:

**About you**
- Roles, dates and one-line summaries for **Tamara, Careem and Rila**. No information about these roles was available, so they are placeholders.
- Your title at Fada and its dates. Confirm you're happy to name Fada publicly.
- Public contact email, LinkedIn URL, and current availability.
- City. The site says "Saudi Arabia", inferred from your projects. Optionally add education.
- A portrait (optional). The design works without one.

**Projects**
- **Real Estate Aggregator:** no code or documentation was found in any accessible repository, so it isn't on the site. Send details or a repo and it can be added as a project file.
- **Operra Events OS:** screenshots, and whether to share a public demo link (the deployment appears to be access-protected).
- **Operra:** confirm the product-site and demo URLs are public; confirm whether Fada's workspace is in daily use.
- **Sukan:** screenshots of each iteration; whether waitlist sign-up numbers can be cited (none are claimed now).
- **Luxe (Salla theme):** screenshots from a demo store; publishing and licence plan.
- University and experimental projects: the `MIS-366` and `project1.1` repos only contain starter files and data, so they aren't featured.

**Decisions**
- How to describe AI-assisted development. It is currently stated openly as "AI-assisted; product, architecture and review were mine".
- Budget ranges in the form (`src/content/contact.ts`).
- Final domain.
