import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";
import { CodeCard } from "@/components/ui/CodeCard";
import { ContactCard } from "@/components/ui/ContactCard";
import { InfoChip } from "@/components/ui/InfoChip";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillCard } from "@/components/ui/SkillCard";
import { TagList } from "@/components/ui/Tag";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { Job, Project } from "@/types/content";

const html = (node: React.ReactNode) => renderToStaticMarkup(node);

describe("Button", () => {
  it("renders a native button with type=button by default", () => {
    const out = html(<Button>Go</Button>);
    expect(out).toMatch(/^<button[^>]*type="button"/);
  });

  it("renders a link when given href", () => {
    expect(html(<Button href="#work">Go</Button>)).toMatch(
      /^<a[^>]*href="#work"/,
    );
  });

  it("opens external links safely in a new tab", () => {
    const out = html(
      <Button href="https://example.com" external>
        Go
      </Button>,
    );
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it("forwards download and data attributes", () => {
    const out = html(
      <Button href="/cv.pdf" download data-event="resume_download">
        CV
      </Button>,
    );
    expect(out).toContain("download");
    expect(out).toContain('data-event="resume_download"');
  });

  it("applies variant and full-width-on-mobile classes", () => {
    const out = html(
      <Button href="#x" variant="secondary" stretch>
        Go
      </Button>,
    );
    expect(out).toContain("border-border-strong");
    expect(out).toContain("w-full xs:w-auto");
  });

  it("meets the 44px touch target (h-11 / h-12)", () => {
    expect(html(<Button>a</Button>)).toContain("h-11");
    expect(html(<Button size="lg">a</Button>)).toContain("h-12");
  });

  it("sm draws a 36px pill inside a 44px hit area", () => {
    const out = html(
      <Button href="/cv.pdf" size="sm" variant="light">
        CV
      </Button>,
    );
    expect(out).toMatch(/^<a href="\/cv.pdf" class="group inline-flex h-11 /);
    const pill = out.match(/<span class="([^"]*)">CV<\/span>/)?.[1] ?? "";
    expect(pill.split(" ")).toEqual(expect.arrayContaining(["h-9", "bg-text"]));
    expect(out).toContain("group-focus-visible:outline-2");
  });
});

describe("TagList", () => {
  it("renders a list of tags", () => {
    const out = html(<TagList items={["React", "Next.js"]} />);
    expect(out).toMatch(/^<ul/);
    expect(out.match(/<li>/g)).toHaveLength(2);
  });

  it("renders nothing for an empty list", () => {
    expect(html(<TagList items={[]} />)).toBe("");
  });
});

describe("SectionHeader", () => {
  it("renders the eyebrow and an h2 with the given id", () => {
    const out = html(
      <SectionHeader id="x-heading" eyebrow="// x" heading="Hello" />,
    );
    expect(out).toContain("// x");
    expect(out).toMatch(/<h2 id="x-heading"[^>]*>Hello<\/h2>/);
  });
});

describe("CodeCard", () => {
  const out = html(
    <CodeCard
      label="Profile as code"
      fileName="engineer.ts"
      language="TypeScript"
      lines={[
        [{ kind: "keyword", text: "const" }],
        [{ kind: "string", text: '"x"' }],
      ]}
    />,
  );

  it("is a labelled figure", () => {
    expect(out).toMatch(/^<figure aria-label="Profile as code"/);
  });

  it("colors tokens and joins lines without a trailing newline", () => {
    expect(out).toContain('<span class="text-code-keyword">const</span>');
    expect(out).toContain(
      '<span class="text-code-string">&quot;x&quot;</span>\n'.slice(0, -1),
    );
    expect(out).toMatch(/const<\/span>\n<span/);
    expect(out).not.toMatch(/\n<\/code>/);
  });
});

describe("TimelineItem", () => {
  const job: Job = {
    role: "Engineer",
    company: "Acme",
    location: "Patna",
    start: "2023-11",
    end: null,
    points: ["Built things.", "Shipped things."],
    tags: ["React"],
  };

  it("shows month-year dates in <time> and 'Present' for the current role", () => {
    const out = html(<TimelineItem job={job} presentLabel="Present" />);
    expect(out).toContain('<time dateTime="2023-11">Nov 2023</time> — Present');
  });

  it("uses the accent dot for the current role and the muted dot for past roles", () => {
    expect(html(<TimelineItem job={job} presentLabel="Present" />)).toContain(
      "border-accent",
    );
    const past = html(
      <TimelineItem job={{ ...job, end: "2024-02" }} presentLabel="Present" />,
    );
    expect(past).toContain("border-dot-past");
    expect(past).toContain('<time dateTime="2024-02">Feb 2024</time>');
  });

  it("renders every bullet and tag", () => {
    const out = html(<TimelineItem job={job} presentLabel="Present" />);
    expect(out).toContain("Built things.");
    expect(out).toContain("Shipped things.");
    expect(out).toContain("React");
  });
});

describe("SkillCard", () => {
  it("shows a zero-padded, screen-reader-hidden count", () => {
    const out = html(
      <SkillCard group={{ title: "Tools", items: ["Git", "Jira"] }} />,
    );
    expect(out).toMatch(/<span aria-hidden="true"[^>]*>02<\/span>/);
    expect(out).toContain("<h3");
  });
});

describe("ProjectCard", () => {
  const labels = {
    live: "Live",
    inProgress: "In progress",
    visit: "Visit",
    view: "View project",
  };
  const featured: Project = {
    name: "CalQ",
    status: "live",
    featured: true,
    description: "Tools.",
    tags: ["Next.js"],
    url: "https://www.calq.online/",
  };

  it("featured: Live badge, host-based visit link and project_click tracking", () => {
    const out = html(<ProjectCard project={featured} labels={labels} />);
    expect(out).toContain("Live");
    expect(out).toContain("Visit calq.online");
    expect(out).toContain('data-event="project_click"');
    expect(out).toContain('data-project="CalQ"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it("compact: uses its label and falls back to the repo link", () => {
    const out = html(
      <ProjectCard
        project={{
          ...featured,
          featured: false,
          status: "in-progress",
          label: "Side project",
          url: undefined,
          repo: "https://github.com/x/y",
        }}
        labels={labels}
      />,
    );
    expect(out).toContain("Side project");
    expect(out).toContain('href="https://github.com/x/y"');
    expect(out).toContain("View project");
  });

  it("compact: omits the link when there is no url or repo", () => {
    const out = html(
      <ProjectCard
        project={{ ...featured, featured: false, url: undefined }}
        labels={labels}
      />,
    );
    expect(out).not.toContain("<a ");
  });
});

describe("ContactCard", () => {
  it("is one link carrying contact_click tracking with its channel", () => {
    const out = html(
      <ContactCard
        href="mailto:a@b.co"
        label="Email"
        value="a@b.co"
        icon={null}
        channel="email"
      />,
    );
    expect(out).toMatch(
      /^<a href="mailto:a@b.co" data-event="contact_click" data-channel="email"/,
    );
    expect(out).not.toContain("target=");
  });

  it("opens external profiles safely", () => {
    const out = html(
      <ContactCard
        href="https://github.com/x"
        label="GitHub"
        value="x"
        icon={null}
        channel="github"
        external
      />,
    );
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
  });
});

describe("InfoChip", () => {
  it("renders label and value", () => {
    const out = html(<InfoChip label="Notice period" value="15 days" />);
    expect(out).toContain("Notice period");
    expect(out).toContain("15 days");
  });
});
