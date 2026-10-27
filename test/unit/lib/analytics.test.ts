import { track as vercelTrack } from "@vercel/analytics";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isAnalyticsEvent, track } from "@/lib/analytics";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

afterEach(() => {
  vi.mocked(vercelTrack).mockClear();
});

describe("isAnalyticsEvent", () => {
  it("accepts the three PRD events", () => {
    expect(isAnalyticsEvent("resume_download")).toBe(true);
    expect(isAnalyticsEvent("contact_click")).toBe(true);
    expect(isAnalyticsEvent("project_click")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isAnalyticsEvent("page_view")).toBe(false);
    expect(isAnalyticsEvent(undefined)).toBe(false);
    expect(isAnalyticsEvent(42)).toBe(false);
  });
});

describe("track", () => {
  it("forwards the event and its props to Vercel Web Analytics", () => {
    track("contact_click", { channel: "email" });
    expect(vercelTrack).toHaveBeenCalledWith("contact_click", {
      channel: "email",
    });
  });

  it("defaults props to an empty object", () => {
    track("resume_download");
    expect(vercelTrack).toHaveBeenCalledWith("resume_download", {});
  });
});
