import { expect, test } from "./fixtures";

// SEO output is identical across viewports; run it once.
test.skip(({ isMobile }) => isMobile, "desktop only");

test("head has description, canonical, Open Graph, Twitter and icons", async ({
  page,
}) => {
  await page.goto("/");
  const head = page.locator("head");
  const description = await head
    .locator("meta[name=description]")
    .getAttribute("content");
  expect(description!.length).toBeLessThanOrEqual(160);

  await expect(head.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://zishan.dev",
  );
  await expect(head.locator("meta[property='og:type']")).toHaveAttribute(
    "content",
    "profile",
  );
  await expect(head.locator("meta[property='og:image']")).toHaveAttribute(
    "content",
    /\/opengraph-image/,
  );
  await expect(head.locator("meta[property='og:image:width']")).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(
    head.locator("meta[property='og:image:height']"),
  ).toHaveAttribute("content", "630");
  await expect(head.locator("meta[name='twitter:card']")).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(head.locator("meta[name='twitter:image']")).toHaveAttribute(
    "content",
    /\/twitter-image/,
  );
  await expect(
    head.locator("link[rel=icon][type='image/svg+xml']"),
  ).toHaveCount(1);
  await expect(head.locator("link[rel=apple-touch-icon]")).toHaveCount(1);
  await expect(head.locator("meta[name=theme-color]")).toHaveAttribute(
    "content",
    "#0c0c0f",
  );
});

test("JSON-LD describes a Person per the PRD", async ({ page }) => {
  await page.goto("/");
  const json = await page
    .locator("script[type='application/ld+json']")
    .textContent();
  const person = JSON.parse(json!);
  expect(person).toMatchObject({
    "@type": "Person",
    name: "Zishan Faridy",
    jobTitle: "Frontend Engineer",
    address: { addressLocality: "Patna" },
    nationality: { name: "India" },
  });
  expect(person.sameAs).toHaveLength(2);
});

test.describe("generated assets", () => {
  for (const [path, type] of [
    ["/opengraph-image", "image/png"],
    ["/twitter-image", "image/png"],
    ["/apple-icon", "image/png"],
    ["/icon.svg", "image/svg+xml"],
    ["/robots.txt", "text/plain"],
    ["/sitemap.xml", "application/xml"],
  ] as const) {
    test(`GET ${path} → ${type}`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.ok()).toBe(true);
      expect(res.headers()["content-type"]).toContain(type);
    });
  }

  test("robots.txt allows crawling and points to the sitemap", async ({
    request,
  }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://zishan.dev/sitemap.xml");
  });

  test("sitemap lists the home page", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<loc>https://zishan.dev/</loc>");
  });
});
