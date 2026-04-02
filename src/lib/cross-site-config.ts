// ═══════════════════════════════════════════════════════════
// Cross-Site Configuration
// Shared constants, CORS origins, API auth helpers.
// Copy to both projects' src/lib/ directories.
// ═══════════════════════════════════════════════════════════

// ── Site URLs ───────────────────────────────────────────────

export const SITES = {
  public: process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || "https://leadengineapp.vercel.app",
  internal: process.env.NEXT_PUBLIC_INTERNAL_APP_URL || "https://realtyclientengine.com",
} as const;

// ── CORS Allowed Origins ────────────────────────────────────

export const ALLOWED_ORIGINS = [
  SITES.public,
  SITES.internal,
  "https://leadengineapp.vercel.app",
  "https://realtyclientengine.com",
  "https://www.realtyclientengine.com",
  "https://leadengine-sepia.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
] as const;

// ── API Key Auth ────────────────────────────────────────────
// Both apps share a secret key for cross-site API calls.
// Set CROSS_SITE_API_KEY in both Vercel projects' env vars.

export function validateCrossSiteKey(request: Request): boolean {
  const apiKey = request.headers.get("x-le-api-key");
  const expectedKey = process.env.CROSS_SITE_API_KEY;
  if (!expectedKey) return false;
  return apiKey === expectedKey;
}

export function getCrossSiteHeaders(): Record<string, string> {
  return {
    "x-le-api-key": process.env.CROSS_SITE_API_KEY || "",
    "x-le-source": typeof window === "undefined" ? "server" : "client",
    "Content-Type": "application/json",
  };
}

// ── CORS Headers Builder ────────────────────────────────────

export function buildCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-le-api-key, x-le-source",
    "Access-Control-Max-Age": "86400",
  };

  if (origin && (ALLOWED_ORIGINS as readonly string[]).includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

// ── Cross-Site Fetch Helper ─────────────────────────────────
// Used by internal app to call public site APIs and vice versa.

export async function crossSiteFetch<T = unknown>(
  targetSite: "public" | "internal",
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown>;
    timeout?: number;
  } = {}
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const { method = "GET", body, timeout = 10000 } = options;
  const baseUrl = targetSite === "public" ? SITES.public : SITES.internal;
  const url = `${baseUrl}${path}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: getCrossSiteHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      return { ok: false, error: errBody.error || `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { ok: true, data: data as T };
  } catch (err: unknown) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}

// ── Notification Priority Logic ─────────────────────────────

export function getNotificationPriority(source: string, leadType?: string): "critical" | "high" | "normal" | "low" {
  const hotSources = ["Showing Request", "Home Value", "IDX Gate"];
  const warmSources = ["Homepage CTA", "Live Chat", "Home Match Quiz"];

  if (hotSources.some(s => source.includes(s))) return "critical";
  if (leadType === "Seller") return "high";
  if (warmSources.some(s => source.includes(s))) return "high";
  if (source === "Search Alerts") return "normal";
  return "normal";
}

// ── Speed-to-Lead Time Targets ──────────────────────────────

export const SPEED_TO_LEAD = {
  critical: { minutes: 2, label: "Call within 2 minutes" },
  high: { minutes: 5, label: "Call within 5 minutes" },
  normal: { minutes: 15, label: "Reach out within 15 minutes" },
  low: { minutes: 60, label: "Follow up within 1 hour" },
} as const;
