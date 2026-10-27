import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { contact } from "@/content/contact";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

// next/image needs Next's runtime config; the Work section (the only user of
// it) is covered by the Playwright suite instead.
vi.mock("next/image", () => ({ default: () => null }));

// Integration of sections with the real content files.

describe("About", () => {
  const out = renderToStaticMarkup(<About />);

  it("is a labelled section with the About heading", () => {
    expect(out).toMatch(/<section id="about" aria-labelledby="about-heading"/);
  });

  it("shows years, current role, nationality and relocation from profile.ts", () => {
    expect(out).toContain(
      `${profile.yearsExperience}<span class="text-accent">+</span>`,
    );
    expect(out).toContain(profile.currently);
    expect(out).toContain(
      `${profile.nationality} · open to relocating to ${profile.relocateTo.join(", ")}`,
    );
  });
});

describe("Experience", () => {
  const out = renderToStaticMarkup(<Experience />);

  it("renders every role in an ordered list, newest first", () => {
    expect(out.match(/<li class="grid/g)).toHaveLength(experience.length);
    const positions = experience.map((job) => out.indexOf(job.company));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});

describe("Skills", () => {
  it("renders one card per skill group", () => {
    const out = renderToStaticMarkup(<Skills />);
    expect(out.match(/<article/g)).toHaveLength(skills.length);
  });
});

describe("Education", () => {
  const out = renderToStaticMarkup(<Education />);

  it("renders every qualification", () => {
    for (const item of education) expect(out).toContain(item.degree);
  });

  it("hides the year line for entries without years", () => {
    const withoutYears = education.filter((item) => !item.start && !item.end);
    const yearLines = out.match(/mb-2 font-mono/g) ?? [];
    expect(yearLines).toHaveLength(education.length - withoutYears.length);
  });
});

describe("Contact", () => {
  const out = renderToStaticMarkup(<Contact />);

  it("builds the mailto link from contact.ts", () => {
    expect(out).toContain(`href="mailto:${contact.email}"`);
  });

  it("shows a phone (tel:) card only when a number is configured", () => {
    expect(out.includes('href="tel:')).toBe(Boolean(contact.phone));
    expect(out.includes('data-channel="phone"')).toBe(Boolean(contact.phone));
  });

  it("tracks a contact_click channel on every card", () => {
    for (const channel of ["email", "linkedin", "github"]) {
      expect(out).toContain(`data-channel="${channel}"`);
    }
  });

  it("shows notice period and timezone chips", () => {
    expect(out).toContain(contact.noticePeriod);
    expect(out).toContain(contact.timezone);
  });

  it("shows a WhatsApp card only when a number is configured", () => {
    expect(out.includes('data-channel="whatsapp"')).toBe(
      Boolean(contact.whatsapp),
    );
  });
});
