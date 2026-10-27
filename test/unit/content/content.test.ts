import { describe, expect, it } from "vitest";
import { contact } from "@/content/contact";
import { achievements, education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

// Content rules from CLAUDE.md and docs/PRD.md §2. These fail the build if an
// edit to src/content/ breaks a rule, before it ever reaches a recruiter.

const allContent = {
  profile,
  contact,
  experience,
  skills,
  projects,
  education,
  achievements,
  site,
};
const allText = JSON.stringify(allContent);

describe("headline title", () => {
  it('is "Frontend Engineer"', () => {
    expect(profile.title).toBe("Frontend Engineer");
  });

  it('never says "Senior Frontend Engineer" outside the Experience timeline', () => {
    const outsideTimeline = { ...allContent, experience: [] };
    expect(JSON.stringify(outsideTimeline)).not.toMatch(
      /Senior Frontend Engineer/i,
    );
  });

  it('only uses "Senior" on the current role', () => {
    const seniorRoles = experience.filter((job) => /senior/i.test(job.role));
    expect(seniorRoles.every((job) => job.end === null)).toBe(true);
  });
});

describe("wording", () => {
  it("has no freelancing, services or pricing language", () => {
    expect(allText).not.toMatch(
      /freelanc|hire me for|my services|our services|pricing|per hour|hourly rate/i,
    );
  });
});

describe("experience", () => {
  it("is ordered newest first", () => {
    const starts = experience.map((job) => job.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  it("has exactly one current role, and it is first", () => {
    const current = experience.filter((job) => job.end === null);
    expect(current).toHaveLength(1);
    expect(experience[0].end).toBeNull();
  });

  it("never ends a role before it starts", () => {
    for (const job of experience) {
      if (job.end) expect(job.end >= job.start, job.company).toBe(true);
    }
  });

  it.each(experience.map((job) => [job.company, job] as const))(
    "%s has 2–4 bullets, each capitalised and under ~25 words",
    (_company, job) => {
      expect(job.points.length).toBeGreaterThanOrEqual(2);
      expect(job.points.length).toBeLessThanOrEqual(4);
      for (const point of job.points) {
        expect(point.split(/\s+/).length, point).toBeLessThanOrEqual(25);
        expect(point[0], point).toMatch(/[A-Z]/);
      }
      expect(job.tags.length).toBeGreaterThan(0);
    },
  );

  it("supports the claimed years of experience", () => {
    const earliest = experience.map((job) => job.start).sort()[0];
    const [year, month] = earliest.split("-").map(Number);
    const now = new Date();
    const years = now.getFullYear() - year + (now.getMonth() + 1 - month) / 12;
    expect(years).toBeGreaterThanOrEqual(profile.yearsExperience);
  });
});

describe("skills", () => {
  it("has the 9 PRD categories", () => {
    expect(skills).toHaveLength(9);
  });

  it.each(skills.map((group) => [group.title, group] as const))(
    "%s is non-empty with no duplicates",
    (_title, group) => {
      expect(group.items.length).toBeGreaterThan(0);
      expect(new Set(group.items).size).toBe(group.items.length);
    },
  );
});

describe("projects", () => {
  it("has a featured project with a live https link", () => {
    const featured = projects.filter((project) => project.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
    for (const project of featured) {
      expect(project.url).toMatch(/^https:\/\//);
    }
  });

  it("has at most 2 secondary cards, each with real content", () => {
    const secondary = projects.filter((project) => !project.featured);
    expect(secondary.length).toBeLessThanOrEqual(2);
    for (const project of secondary) {
      expect(project.description, project.name).not.toMatch(/\[.*\]/);
      expect(project.url ?? project.repo, project.name).toBeTruthy();
    }
  });
});

describe("contact", () => {
  it("has a valid email", () => {
    expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i);
  });

  it.skipIf(!contact.phone)(
    "has a dialable international phone number (when shown)",
    () => {
      expect(contact.phone!.replace(/[^\d+]/g, "")).toMatch(/^\+\d{10,15}$/);
    },
  );

  it("has https LinkedIn and GitHub profile URLs", () => {
    expect(contact.linkedin).toMatch(
      /^https:\/\/(www\.)?linkedin\.com\/in\/.+/,
    );
    expect(contact.github).toMatch(/^https:\/\/github\.com\/.+/);
  });

  it("points the resume at a PDF under /resume/", () => {
    expect(contact.resumePath).toMatch(/^\/resume\/.+\.pdf$/);
  });
});

describe("site copy and SEO", () => {
  it("uses the PRD page title", () => {
    expect(site.seo.title).toBe(
      "Zishan Faridy — Frontend Engineer (React, Next.js, TypeScript)",
    );
  });

  it("keeps the meta description within 160 characters", () => {
    expect(site.seo.description.length).toBeLessThanOrEqual(160);
  });

  it("has an https canonical origin without a trailing slash", () => {
    expect(site.seo.url).toMatch(/^https:\/\/[^/]+$/);
  });

  it("links the nav to unique sections", () => {
    const hrefs = site.nav.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

// Launch gate (PRD launch checklist): run with LAUNCH_CHECK=1 before going live.
describe.skipIf(!process.env.LAUNCH_CHECK)("launch readiness", () => {
  it("has no [PLACEHOLDER] values left in content", () => {
    const placeholders = allText.match(/\[[A-Z][A-Z0-9 _/+.-]*\]/g) ?? [];
    expect(placeholders).toEqual([]);
  });
});
