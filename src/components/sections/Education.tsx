import { Award } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { achievements, education } from "@/content/education";
import { site } from "@/content/site";

export function Education() {
  return (
    <Section id="education" copy={site.sections.education}>
      <ul className="grid gap-4 md:grid-cols-3">
        {education.map((item) => (
          <li
            key={item.degree}
            className="rounded-card border border-border bg-surface p-5 transition-colors duration-150 ease-out hover:border-border-strong xl:p-6"
          >
            <p className="font-mono text-tag text-muted">
              {item.start ? `${item.start} — ${item.end}` : item.end}
            </p>
            <h3 className="mt-2 text-copy-sm font-semibold text-text">
              {item.degree}
            </h3>
            <p className="text-label-sm text-muted">{item.institution}</p>
          </li>
        ))}
      </ul>

      {achievements.length > 0 && (
        <ul className="mt-4 grid gap-4">
          {achievements.map((achievement) => (
            <li
              key={achievement.title}
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 xl:px-6"
            >
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-button bg-surface-2 text-accent"
              >
                <Award className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-label-sm text-muted">
                  {site.education.achievementLabel}
                </p>
                <h3 className="text-label font-medium text-text">
                  {achievement.title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
