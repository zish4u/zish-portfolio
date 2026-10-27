import { expect, test } from "./fixtures";

const noHorizontalScroll = (page: import("@playwright/test").Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await noHorizontalScroll(page)).toBeLessThanOrEqual(0);
  });
}

test.describe("below 400px", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test("code card wraps at 12.5px", async ({ page }) => {
    await page.goto("/");
    const style = await page
      .locator("figure pre")
      .evaluate((el) => [
        getComputedStyle(el).whiteSpace,
        getComputedStyle(el).fontSize,
      ]);
    expect(style).toEqual(["pre-wrap", "12.5px"]);
  });

  test("hero buttons are full width", async ({ page }) => {
    await page.goto("/");
    const column = await page
      .locator("#top .site-container")
      .evaluate((el) => el.clientWidth - 40);
    for (const name of ["See my work", "Contact me"]) {
      const box = await page
        .locator("#top")
        .getByRole("link", { name })
        .boundingBox();
      expect(Math.round(box!.width)).toBe(column);
    }
  });
});

test("every visible link and button is at least 44px tall", async ({
  page,
}) => {
  await page.goto("/");
  const small = await page.locator("a[href], button").evaluateAll((els) =>
    els
      .filter(
        (el) =>
          (el as HTMLElement).offsetParent !== null &&
          el.getAttribute("href") !== "#main",
      )
      .map((el) => ({
        text: el.textContent?.trim().slice(0, 30),
        h: el.getBoundingClientRect().height,
      }))
      .filter((x) => x.h < 44),
  );
  expect(small).toEqual([]);
});

test("hero stacks to one column below 900px and two above", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const columns = await page
    .locator("#top .grid")
    .first()
    .evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
    );
  expect(columns).toBe(isMobile ? 1 : 2);
});
