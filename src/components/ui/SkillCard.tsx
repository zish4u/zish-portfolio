import { padCount } from "@/lib/format";
import type { SkillGroup } from "@/types/content";
import { TagList } from "./Tag";

export function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <article className="rounded-card border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="text-copy-sm font-semibold text-text">{group.title}</h3>
        {/* The chip list already conveys the count to screen readers. */}
        <span aria-hidden className="font-mono text-tag text-muted">
          {padCount(group.items.length)}
        </span>
      </header>
      <TagList items={group.items} variant="chip" className="mt-4" />
    </article>
  );
}
