# Ibrahim Al-Eisa — portfolio

Personal freelance portfolio: home, work index with filtering, a reusable case-study template, services, about and a working project-inquiry form.

- **Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4
- **Hosting:** Cloudflare Workers with Static Assets: the static site in `out/` plus one small Worker for the contact form
- **Runtime dependencies:** `next`, `react`, `react-dom`. Nothing else ships to the browser.

```bash
npm install
npm run dev            # http://localhost:3000 (the contact form shows "not connected" here — expected)
npm run build          # static site in ./out
npm run preview        # build + run the site and contact Worker locally via wrangler dev (http://localhost:8788)
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

The form posts JSON to `/api/contact`. That endpoint is handled by the Cloudflare Worker (`worker/index.ts` routes it to `worker/contact.ts`), which:

- validates the input, checks the request is same-origin, and catches bots with a honeypot field;
- optionally verifies Cloudflare Turnstile;
- sends the inquiry through [Resend](https://resend.com), with `reply_to` set to the sender.

It returns `{ ok: true }` **only after Resend accepts the email**. When it isn't configured it returns `503`, and the form says plainly that the message was **not** sent, then points visitors to your fallback contact. A false success message is impossible by design.

### Set up email delivery

1. Create a Resend account, add and verify your domain, and create an API key.
2. In **Cloudflare dashboard → Workers & Pages → `ibrahem-portal` → Settings → Variables and Secrets**, add the following (or run `npx wrangler secret put <NAME>`):

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

## Deploying to Cloudflare (Workers + Static Assets)

The site uses Next.js **static export** (`output: "export"`): every page is pre-rendered into `out/`. `wrangler.toml` deploys it as a Cloudflare **Worker with Static Assets**:

- **`[assets] directory = "./out"`:** Cloudflare serves the pages, images and `_headers` straight from its edge.
  - `html_handling = "auto-trailing-slash"` makes `/about` serve `about.html`.
  - `not_found_handling = "404-page"` serves `404.html` for unknown paths.
- **`main = "worker/index.ts"`:** the Worker runs only for `/api/*` (`run_worker_first`), which is where the contact form posts.
- **`keep_vars = true`:** deploys don't wipe variables you set in the dashboard.

Features that need a Node server are deliberately not used: next/image optimisation, middleware, ISR and route handlers. Images ship pre-sized, with `images.unoptimized`. If you later need server features, switch to `@opennextjs/cloudflare`.

> The project must be a **Worker**, not a Pages project. `wrangler deploy` needs `main` and `[assets]` in `wrangler.toml`, which this repo now provides. The Worker name in the dashboard must match `name = "ibrahem-portal"` in `wrangler.toml`; if yours differs, change one of them.

### Option A: Workers Builds (Git integration)

1. Cloudflare dashboard → **Workers & Pages → `ibrahem-portal` → Settings → Build**. Connect `Ibrahemaleisa/ibrahem-portal` if it isn't connected yet.
2. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
   - Production branch: the branch you deploy (currently `claude/portfolio-website-build-mic1yj`; set it to `main` once that branch is merged)
3. Build variables (Settings → Build → Variables and secrets). These are read at **build** time:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (canonical URLs, sitemap and Open Graph)
   - `NEXT_PUBLIC_SHOW_DRAFT_NOTES` = `false` (when you're ready)
   - optional `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Runtime variables (Settings → Variables and Secrets): the contact settings from the table above.
5. Push. Every push to the production branch builds and deploys; other branches get preview versions if enabled.

### Option B: CLI

```bash
npx wrangler login
npm run deploy        # next build && wrangler deploy
```

### Custom domain, DNS and HTTPS

1. The domain must use Cloudflare DNS (add it as a zone and change its nameservers at the registrar).
2. **Worker → Settings → Domains & Routes → Add → Custom domain.** Enter `yourdomain.com`, and optionally `www.yourdomain.com`. Cloudflare creates the DNS records for you. Until then the site is live at `ibrahem-portal.<your-subdomain>.workers.dev`.
3. Cloudflare issues and renews the HTTPS certificate automatically. Then enable **Always Use HTTPS** under SSL/TLS → Edge Certificates.
4. Redirect `www` → apex (or the reverse) with a Bulk Redirect or Redirect Rule.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

Security headers and caching rules live in `public/_headers`.

### Linking live projects

Each project has its own case study at `/work/<slug>`. Live apps and demos are attached as `links` on the project. They can live anywhere:

| Kind of project | Suggested home | How |
|---|---|---|
| Vercel apps (Operra, Operra Events OS) | `operra.yourdomain.com`, `events.yourdomain.com` | Vercel project → Domains → add the subdomain, then add the `CNAME` it shows in your DNS (`cname.vercel-dns.com`). |
| Static prototypes (e.g. Sukan's waitlist page) | `sukan.yourdomain.com` | Deploy it as its own Worker with static assets (or a Pages project), then add the subdomain as a custom domain. Free tier. |
| Salla themes | Salla demo store URL | Link the demo store. |

None of this needs paid infrastructure: Cloudflare Workers free plan (static asset requests are free), Vercel Hobby and Resend's free tier cover it. Do not buy domains or point DNS until you've decided on names.

---

## Project structure

```
src/
  app/                 routes: /, /work, /work/[slug], /services, /about, /contact
                       plus sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found
  components/          presentation only (cover, card, status badge, form, header/footer…)
  content/             all copy and project data
  lib/                 types, draft helpers, OG card renderer
worker/index.ts            Worker entry: /api/* routing, everything else → static assets
worker/contact.ts          contact delivery (validation, Turnstile, Resend)
wrangler.toml              Worker + static assets config
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
