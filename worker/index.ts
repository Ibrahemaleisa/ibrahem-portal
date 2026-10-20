/**
 * Cloudflare Worker entry. The site itself is the static export in ./out,
 * served by Workers Static Assets; only /api/* reaches this code
 * (see run_worker_first in wrangler.toml).
 */
import { handleContact, type ContactEnv } from "./contact";

interface Env extends ContactEnv {
  ASSETS: Fetcher;
}

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") return json(405, { ok: false, error: "Method not allowed." }, { Allow: "POST" });
      return handleContact(request, env);
    }
    if (pathname.startsWith("/api/")) return json(404, { ok: false, error: "Not found." });

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
