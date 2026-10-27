import { afterEach, describe, expect, it, vi } from "vitest";
import { isAnalyticsEvent, track } from "@/lib/analytics";

afterEach(() => {
  vi.unstubAllGlobals();
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
  it("forwards to Vercel Analytics and GA4 when both are loaded", () => {
    const va = vi.fn();
    const gtag = vi.fn();
    vi.stubGlobal("window", { va, gtag });

    track("contact_click", { channel: "email" });

    expect(va).toHaveBeenCalledWith("event", {
      name: "contact_click",
      data: { channel: "email" },
    });
    expect(gtag).toHaveBeenCalledWith("event", "contact_click", {
      channel: "email",
    });
  });

  it("is a safe no-op when no analytics script is loaded", () => {
    vi.stubGlobal("window", {});
    expect(() => track("resume_download")).not.toThrow();
  });

  it("defaults props to an empty object", () => {
    const va = vi.fn();
    vi.stubGlobal("window", { va });
    track("resume_download");
    expect(va).toHaveBeenCalledWith("event", {
      name: "resume_download",
      data: {},
    });
  });
});
