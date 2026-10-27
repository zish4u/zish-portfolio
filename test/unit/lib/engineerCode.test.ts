import { describe, expect, it } from "vitest";
import type { CodeLine } from "@/components/ui/CodeCard";
import { profile } from "@/content/profile";
import { engineerCode } from "@/lib/engineerCode";
import type { Profile } from "@/types/content";

const fixture: Profile = {
  ...profile,
  name: "Ada Lovelace",
  title: "Frontend Engineer",
  yearsExperience: 3,
  coreStack: ["React"],
  alsoFluent: [],
  basedIn: "London, UK",
  openTo: ["UK", "EU"],
  relocate: false,
};

const text = (lines: CodeLine[]) =>
  lines.map((line) => line.map((token) => token.text).join("")).join("\n");

describe("engineerCode", () => {
  it("renders the profile as a TypeScript object literal", () => {
    expect(text(engineerCode(fixture, "years"))).toBe(
      [
        "const engineer = {",
        '  name: "Ada Lovelace",',
        '  role: "Frontend Engineer",',
        "  experience: 3, // years",
        '  core: ["React"],',
        "  alsoFluent: [],",
        '  basedIn: "London, UK",',
        '  openTo: ["UK", "EU"],',
        "  relocate: false,",
        "};",
      ].join("\n"),
    );
  });

  it("colors tokens by kind for syntax highlighting", () => {
    const lines = engineerCode(fixture, "years");
    const kindOf = (text: string) =>
      lines.flat().find((token) => token.text === text)?.kind;

    expect(kindOf("const")).toBe("keyword");
    expect(kindOf('"Ada Lovelace"')).toBe("string");
    expect(kindOf("3")).toBe("number");
    expect(kindOf("false")).toBe("number"); // booleans share the number color
    expect(kindOf(" // years")).toBe("comment");
  });

  it("uses the real profile with the headline title, never 'Senior'", () => {
    const code = text(engineerCode(profile, "years, and counting"));
    expect(code).toContain(`role: "${profile.title}"`);
    expect(code).toContain('role: "Frontend Engineer"');
    expect(code).not.toContain("Senior");
  });
});
