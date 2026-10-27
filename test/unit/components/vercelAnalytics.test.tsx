import { Analytics } from "@vercel/analytics/next";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VercelAnalytics } from "@/components/layout/VercelAnalytics";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("VercelAnalytics", () => {
  it("renders nothing outside Vercel (local, CI)", () => {
    vi.stubEnv("VERCEL", "");
    expect(VercelAnalytics()).toBeNull();
  });

  it("renders the official <Analytics /> component on Vercel builds", () => {
    vi.stubEnv("VERCEL", "1");
    const el = VercelAnalytics() as ReactElement;
    expect(el.type).toBe(Analytics);
  });
});
