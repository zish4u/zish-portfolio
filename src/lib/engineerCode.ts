import type { CodeLine, CodeToken } from "@/components/ui/CodeCard";
import type { Profile } from "@/types/content";

const p = (text: string): CodeToken => ({ kind: "punctuation", text });
const plain = (text: string): CodeToken => ({ kind: "plain", text });
const str = (text: string): CodeToken => ({
  kind: "string",
  text: `"${text}"`,
});

function list(items: string[]): CodeToken[] {
  return [
    p("["),
    ...items.flatMap((item, i) =>
      i === 0 ? [str(item)] : [p(", "), str(item)],
    ),
    p("]"),
  ];
}

function prop(key: string, value: CodeToken[], comment?: string): CodeLine {
  return [
    plain(`  ${key}`),
    p(": "),
    ...value,
    p(","),
    ...(comment ? [{ kind: "comment" as const, text: ` // ${comment}` }] : []),
  ];
}

/**
 * Builds the hero `engineer.ts` card from the profile at build time, so the
 * code card and the About section can never drift apart.
 */
export function engineerCode(
  profile: Profile,
  experienceComment: string,
): CodeLine[] {
  return [
    [{ kind: "keyword", text: "const" }, plain(" engineer "), p("= {")],
    prop("name", [str(profile.name)]),
    prop("role", [str(profile.title)]),
    prop(
      "experience",
      [{ kind: "number", text: String(profile.yearsExperience) }],
      experienceComment,
    ),
    prop("core", list(profile.coreStack)),
    prop("alsoFluent", list(profile.alsoFluent)),
    prop("basedIn", [str(profile.basedIn)]),
    prop("remote", list(profile.remote)),
    prop("relocateTo", list(profile.relocateTo)),
    [p("};")],
  ];
}
