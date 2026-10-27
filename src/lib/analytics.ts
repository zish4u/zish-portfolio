export type AnalyticsEvent =
  "resume_download" | "contact_click" | "project_click";

const EVENTS = new Set<string>([
  "resume_download",
  "contact_click",
  "project_click",
]);

declare global {
  interface Window {
    /** Vercel Web Analytics queue (set by its script). */
    va?: (command: "event", payload: { name: string; data?: object }) => void;
    /** Google Analytics 4 (set by gtag.js). */
    gtag?: (command: "event", name: string, params?: object) => void;
  }
}

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === "string" && EVENTS.has(value);
}

/**
 * Provider-agnostic event tracking (PRD FR 7). Forwards to whichever analytics
 * script is loaded; a no-op when none is, so it never breaks the page.
 */
export function track(
  event: AnalyticsEvent,
  props: Record<string, string> = {},
) {
  window.va?.("event", { name: event, data: props });
  window.gtag?.("event", event, props);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props);
  }
}
