import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("résumé button downloads the PDF path", async ({ page }) => {
  const resume = page.getByRole("link", { name: "Résumé" });
  await expect(resume).toHaveAttribute(
    "href",
    "/resume/Zishan-Faridy-Resume.pdf",
  );
  await expect(resume).toHaveAttribute("download", "");
});

test("résumé PDF is served", async ({ request }) => {
  test.skip(
    !process.env.LAUNCH_CHECK,
    "launch gate: add the PDF, then LAUNCH_CHECK=1",
  );
  const res = await request.get("/resume/Zishan-Faridy-Resume.pdf");
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("contact cards use mailto/tel and open profiles safely", async ({
  page,
}) => {
  const contact = page.locator("#contact");
  await expect(contact.locator("a[data-channel=email]")).toHaveAttribute(
    "href",
    /^mailto:.+@.+/,
  );
  await expect(contact.locator("a[data-channel=phone]")).toHaveAttribute(
    "href",
    /^tel:\+\d{10,15}$/,
  );
  for (const channel of ["linkedin", "github"]) {
    const link = contact.locator(`a[data-channel=${channel}]`);
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("target", "_blank");
  }
});

test("every new-tab link has rel=noopener noreferrer", async ({ page }) => {
  const unsafe = await page
    .locator("a[target=_blank]")
    .evaluateAll((links) =>
      links
        .filter((a) => a.getAttribute("rel") !== "noopener noreferrer")
        .map((a) => a.outerHTML),
    );
  expect(unsafe).toEqual([]);
});

test("analytics events fire with their props (PRD FR 7)", async ({ page }) => {
  // Stub Vercel's queue, and stop clicks from navigating away.
  await page.evaluate(() => {
    const w = window as typeof window & { __events: unknown[] };
    w.__events = [];
    w.va = (_cmd, payload) => w.__events.push(payload);
    window.addEventListener("click", (event) => event.preventDefault());
  });

  await page.locator("a[data-event=resume_download]").click();
  for (const channel of ["email", "phone", "linkedin", "github"]) {
    await page.locator(`a[data-channel=${channel}]`).click();
  }
  await page.locator("a[data-event=project_click]").first().click();

  const events = await page.evaluate(
    () => (window as typeof window & { __events: unknown[] }).__events,
  );
  expect(events).toEqual([
    { name: "resume_download", data: {} },
    { name: "contact_click", data: { channel: "email" } },
    { name: "contact_click", data: { channel: "phone" } },
    { name: "contact_click", data: { channel: "linkedin" } },
    { name: "contact_click", data: { channel: "github" } },
    { name: "project_click", data: { project: "CalQ" } },
  ]);
});
