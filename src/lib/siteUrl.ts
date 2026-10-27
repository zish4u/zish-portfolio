import { site } from "@/content/site";

/**
 * Canonical origin. On Vercel this is the project's production domain
 * (VERCEL_PROJECT_PRODUCTION_URL, set at build time), so it stays correct if
 * the subdomain changes or a custom domain is added; elsewhere (local, CI) it
 * falls back to `site.seo.url`.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : site.seo.url;
