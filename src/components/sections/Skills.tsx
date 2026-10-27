import { Section } from "@/components/layout/Section";
import { SkillCard } from "@/components/ui/SkillCard";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" copy={site.sections.skills}>
      <ul className="grid gap-4 md:grid-cols-3">
        {skills.map((group) => (
          <li key={group.title} className="grid">
            <SkillCard group={group} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
