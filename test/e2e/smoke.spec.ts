import { SECTION_IDS, expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("loads with the PRD title and a single h1", async ({ page }) => {
  await expect(page).toHaveTitle(
    "Zishan Faridy — Frontend Engineer (React, Next.js, TypeScript)",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Hi, I’m Zishan.");
});

test("renders all sections in PRD order", async ({ page }) => {
  const ids = await page
    .locator("main section[id]")
    .evaluateAll((sections) => sections.map((s) => s.id));
  expect(ids).toEqual([...SECTION_IDS]);
});

test("has header, nav, main and footer landmarks", async ({ page }) => {
  for (const role of ["banner", "navigation", "main", "contentinfo"] as const) {
    await expect(page.getByRole(role).first()).toBeVisible();
  }
});

test("every section has a labelled h2 and cards use h3", async ({ page }) => {
  for (const id of SECTION_IDS.filter((id) => id !== "top")) {
    const section = page.locator(`section#${id}`);
    await expect(section.locator("h2")).toHaveCount(1);
    const labelledBy = await section.getAttribute("aria-labelledby");
    await expect(page.locator(`#${labelledBy}`)).toHaveText(/.+/);
  }
  await expect(page.locator("#experience h3")).toHaveCount(4);
  await expect(page.locator("#skills h3")).toHaveCount(9);
});

test("hero code card is generated from the profile", async ({ page }) => {
  const card = page.getByRole("figure");
  await expect(card).toContainText('role: "Frontend Engineer"');
  await expect(card).toContainText('name: "Zishan Faridy"');
  await expect(card).not.toContainText("Senior");
});

test("CalQ screenshot loads with alt text", async ({ page }) => {
  const img = page.locator("#work img");
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveAttribute("alt", /CalQ/);
  await expect
    .poll(() =>
      img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth),
    )
    .toBeGreaterThan(0);
});

test("no [PLACEHOLDER] text is visible", async ({ page }) => {
  test.skip(!process.env.LAUNCH_CHECK, "launch gate: run with LAUNCH_CHECK=1");
  await expect(page.locator("body")).not.toContainText(/\[[A-Z][A-Z _/]*\]/);
});
