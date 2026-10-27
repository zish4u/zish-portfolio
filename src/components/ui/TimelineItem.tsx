import { cn } from "@/lib/cn";
import { formatYearMonth } from "@/lib/format";
import type { Job } from "@/types/content";
import { TagList } from "./Tag";

type TimelineItemProps = {
  job: Job;
  presentLabel: string;
};

/** One role in the Experience timeline. Render inside an `<ol>`. */
export function TimelineItem({ job, presentLabel }: TimelineItemProps) {
  const current = job.end === null;

  return (
    <li className="grid grid-cols-[28px_1fr] gap-x-3 md:gap-x-5">
      <div aria-hidden className="relative flex justify-center">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
        <span
          className={cn(
            "relative mt-7 size-3.5 rounded-full border-2 bg-bg",
            current ? "border-accent" : "border-dot-past",
          )}
        />
      </div>

      <article className="mb-4 rounded-card border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong xl:p-7">
        <header className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-6">
          <div>
            <h3 className="font-display text-h3 text-text">{job.role}</h3>
            <p className="mt-0.5 text-label">
              <span className="text-accent">{job.company}</span>
              <span className="text-muted"> · {job.location}</span>
            </p>
          </div>
          <p className="shrink-0 font-mono text-label-sm text-muted md:mt-1.5">
            <time dateTime={job.start}>{formatYearMonth(job.start)}</time>
            {" — "}
            {job.end ? (
              <time dateTime={job.end}>{formatYearMonth(job.end)}</time>
            ) : (
              presentLabel
            )}
          </p>
        </header>

        <ul className="mt-4 list-[circle] space-y-1.5 pl-5 text-copy-sm text-body marker:text-muted">
          {job.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <TagList items={job.tags} className="mt-5" />
      </article>
    </li>
  );
}
