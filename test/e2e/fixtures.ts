import { test as base, expect } from "@playwright/test";

/** Fails any test whose page logs a console error or throws. */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "console errors / uncaught exceptions").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const SECTION_IDS = [
  "top",
  "about",
  "experience",
  "skills",
  "work",
  "education",
  "contact",
] as const;

/** Jump to a section without smooth scrolling, so tests aren't timing-bound. */
export async function jumpTo(
  page: import("@playwright/test").Page,
  id: string,
) {
  await page.evaluate((target) => {
    const el = document.getElementById(target);
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, (el?.offsetTop ?? 0) + 120);
    document.documentElement.style.scrollBehavior = "";
  }, id);
}
