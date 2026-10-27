import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  "resume_download" | "contact_click" | "project_click";

const EVENTS = new Set<string>([
  "resume_download",
  "contact_click",
  "project_click",
]);

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === "string" && EVENTS.has(value);
}

/**
 * Custom events (PRD FR 7) via Vercel Web Analytics. A no-op until the
 * <Analytics /> script has loaded (i.e. off Vercel). Vercel shows custom
 * events in the dashboard on Pro/Enterprise plans only.
 */
export function track(
  event: AnalyticsEvent,
  props: Record<string, string> = {},
) {
  vercelTrack(event, props);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props);
  }
}
