import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagVariant = "code" | "chip";

const variants: Record<TagVariant, string> = {
  // Job and project tech tags.
  code: "rounded-tag px-2 py-1 font-mono text-tag",
  // Skill chips.
  chip: "rounded-chip px-2.5 py-1 font-sans text-label-sm",
};

type TagProps = { variant?: TagVariant; children: ReactNode };

export function Tag({ variant = "code", children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block border border-border bg-surface-2 text-chip",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}

type TagListProps = {
  items: string[];
  variant?: TagVariant;
  className?: string;
};

export function TagList({ items, variant, className }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
