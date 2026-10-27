import { describe, expect, it } from "vitest";
import { displayHost, formatYearMonth, padCount } from "@/lib/format";

describe("formatYearMonth", () => {
  it.each([
    ["2023-11", "Nov 2023"],
    ["2020-06", "Jun 2020"],
    ["2021-01", "Jan 2021"],
    ["2022-12", "Dec 2022"],
  ] as const)("formats %s as %s", (input, expected) => {
    expect(formatYearMonth(input)).toBe(expected);
  });

  it("is timezone-independent (no off-by-one month at UTC boundaries)", () => {
    const original = process.env.TZ;
    process.env.TZ = "Pacific/Honolulu";
    try {
      expect(formatYearMonth("2023-01")).toBe("Jan 2023");
    } finally {
      process.env.TZ = original;
    }
  });
});

describe("displayHost", () => {
  it("strips protocol, www and path", () => {
    expect(displayHost("https://www.calq.online/tools?x=1")).toBe(
      "calq.online",
    );
    expect(displayHost("http://example.com")).toBe("example.com");
  });

  it("passes non-URLs through unchanged", () => {
    expect(displayHost("[URL]")).toBe("[URL]");
    expect(displayHost("")).toBe("");
  });
});

describe("padCount", () => {
  it("zero-pads to two digits", () => {
    expect(padCount(1)).toBe("01");
    expect(padCount(8)).toBe("08");
    expect(padCount(12)).toBe("12");
  });
});
