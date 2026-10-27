import type { YearMonth } from "@/types/content";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2023-11" → "Nov 2023" */
export function formatYearMonth(value: YearMonth) {
  const [year, month] = value.split("-").map(Number);
  return monthYear.format(new Date(Date.UTC(year, month - 1)));
}

/** "https://www.calq.online/path" → "calq.online"; non-URLs pass through. */
export function displayHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** 8 → "08" */
export function padCount(count: number) {
  return String(count).padStart(2, "0");
}
