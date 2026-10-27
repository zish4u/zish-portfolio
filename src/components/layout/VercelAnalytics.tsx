import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics, per the official Next.js quickstart. Only rendered on
 * Vercel builds (VERCEL=1): elsewhere the analytics routes don't exist and the
 * script request would 404.
 */
export function VercelAnalytics() {
  if (process.env.VERCEL !== "1") return null;
  return <Analytics />;
}
