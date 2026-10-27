import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BentoCardProps = {
  /** Columns spanned in the 4-column grid (2-column below 900px). */
  span?: 1 | 2;
  label?: string;
  className?: string;
  children: ReactNode;
};

export function BentoCard({
  span = 1,
  label,
  className,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-card border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong xl:p-7",
        span === 2 && "col-span-2",
        className,
      )}
    >
      {label && <h3 className="text-label text-muted">{label}</h3>}
      {children}
    </div>
  );
}
