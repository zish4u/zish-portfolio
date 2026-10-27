import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { displayHost } from "@/lib/format";
import type { Project } from "@/types/content";
import { TagList } from "./Tag";

export type ProjectCardLabels = {
  live: string;
  inProgress: string;
  visit: string;
  view: string;
};

type ProjectCardProps = {
  project: Project;
  labels: ProjectCardLabels;
};

const cardBase =
  "rounded-feature border border-border bg-surface transition-colors duration-150 ease-out hover:border-border-strong";

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return project.featured ? (
    <FeaturedCard project={project} labels={labels} />
  ) : (
    <CompactCard project={project} labels={labels} />
  );
}

function FeaturedCard({ project, labels }: ProjectCardProps) {
  const host = project.url ? displayHost(project.url) : undefined;

  return (
    <article className={cn(cardBase, "grid overflow-hidden md:grid-cols-2")}>
      <div className="flex flex-col p-6 xs:p-9">
        <StatusBadge status={project.status} labels={labels} />
        <h3 className="mt-4 font-display text-h3-featured text-text">
          {project.name}
        </h3>
        <p className="mt-3 text-copy text-body">{project.description}</p>
        <TagList items={project.tags} className="mt-5" />
        {project.url && (
          <ProjectLink
            href={project.url}
            icon="up-right"
            className="mt-auto pt-8"
          >
            {labels.visit} {host}
          </ProjectLink>
        )}
      </div>

      {/* Browser frame with screenshot; empty until an image is provided. */}
      <div className="bg-surface-3 pt-8 pl-6 md:pt-14 md:pl-6">
        <div className="h-full overflow-hidden rounded-tl-button-lg border-t border-l border-border bg-bg">
          <div className="flex h-9 items-center border-b border-border px-3">
            {host && (
              <span className="rounded-tag bg-surface-2 px-2 py-0.5 font-mono text-tag text-muted">
                {host}
              </span>
            )}
          </div>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? ""}
              width={1200}
              height={750}
              sizes="(min-width: 900px) 600px, 100vw"
              className="h-auto w-full"
            />
          ) : (
            <div className="aspect-[16/10]" />
          )}
        </div>
      </div>
    </article>
  );
}

function CompactCard({ project, labels }: ProjectCardProps) {
  const href = project.url ?? project.repo;
  const eyebrow =
    project.label ??
    (project.status === "live" ? labels.live : labels.inProgress);

  return (
    <article className={cn(cardBase, "flex flex-col p-6 xl:p-7")}>
      <p className="font-mono text-tag text-muted">{eyebrow}</p>
      <h3 className="mt-2 font-display text-h3 text-text">{project.name}</h3>
      <p className="mt-2 text-copy-sm text-body">{project.description}</p>
      <TagList items={project.tags} className="mt-4" />
      {href && (
        <ProjectLink href={href} icon="right" className="mt-auto pt-5">
          {labels.view}
        </ProjectLink>
      )}
    </article>
  );
}

function StatusBadge({
  status,
  labels,
}: {
  status: Project["status"];
  labels: ProjectCardLabels;
}) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-tag",
        live ? "bg-success/10 text-success" : "bg-surface-2 text-muted",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          live ? "bg-success" : "bg-dot-past",
        )}
      />
      {live ? labels.live : labels.inProgress}
    </span>
  );
}

function ProjectLink({
  href,
  icon,
  className,
  children,
}: {
  href: string;
  icon: "right" | "up-right";
  className?: string;
  children: ReactNode;
}) {
  const Icon = icon === "right" ? ArrowRight : ArrowUpRight;
  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-11 items-center gap-1.5 text-label font-medium text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
      >
        {children}
        <Icon
          aria-hidden
          strokeWidth={1.8}
          className={cn(
            "size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5",
            icon === "up-right" && "group-hover:-translate-y-0.5",
          )}
        />
      </a>
    </div>
  );
}
