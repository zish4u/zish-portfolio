import { expect, jumpTo, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("skip link is the first Tab stop and moves focus to main", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("focused controls show the 2px accent focus ring", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement!);
    return `${style.outlineStyle} ${style.outlineWidth} ${style.outlineOffset}`;
  });
  expect(outline).toBe("solid 2px 2px");
});

test.describe("desktop nav", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("anchors navigate to their sections", async ({ page }) => {
    const nav = page.getByRole("navigation");
    for (const name of ["About", "Experience", "Skills", "Work", "Contact"]) {
      await nav.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
      await expect(page.locator(`#${name.toLowerCase()} h2`)).toBeInViewport();
    }
  });

  test("highlights the link for the section in view", async ({ page }) => {
    const current = page.locator("nav > ul a[aria-current='location']");
    for (const id of ["about", "experience", "skills", "work", "contact"]) {
      await jumpTo(page, id);
      await expect(current).toHaveAttribute("href", `#${id}`);
    }
    await jumpTo(page, "top");
    await expect(current).toHaveCount(0);
  });

  test("hides the mobile menu button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens and closes accessibly", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    const close = page.getByRole("button", { name: "Close menu" });
    await expect(close).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "About", exact: true }),
    ).toBeFocused();
    expect(
      await page.evaluate(() => document.documentElement.style.overflow),
    ).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    expect(
      await page.evaluate(() => document.documentElement.style.overflow),
    ).toBe("");
  });

  test("traps focus while open", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    const panelId = await page
      .getByRole("button", { name: "Close menu" })
      .getAttribute("aria-controls");
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press(i % 3 === 2 ? "Shift+Tab" : "Tab");
      const inside = await page.evaluate((id) => {
        const active = document.activeElement;
        return (
          !!document.getElementById(id!)?.contains(active) ||
          active?.getAttribute("aria-controls") === id
        );
      }, panelId);
      expect(inside, `focus escaped after ${i + 1} key presses`).toBe(true);
    }
  });

  test("closes on backdrop tap and on link tap", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await page.mouse.click(200, 700);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await page.getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("marks the current section inside the menu", async ({ page }) => {
    await jumpTo(page, "work");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("[id] a[aria-current='location']")).toHaveText(
      "Work",
    );
  });
});

test.describe("motion preferences", () => {
  test("smooth scrolling is on by default", async ({ page }) => {
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(behavior).toBe("smooth");
  });

  test("smooth scrolling is off with prefers-reduced-motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(behavior).toBe("auto");
  });
});
