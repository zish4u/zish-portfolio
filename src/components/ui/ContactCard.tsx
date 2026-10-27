import type { ReactNode } from "react";

type ContactCardProps = {
  href: string;
  label: string;
  value: string;
  /** Decorative icon shown in the 44px tile. */
  icon: ReactNode;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
};

/** The whole card is the link. */
export function ContactCard({
  href,
  label,
  value,
  icon,
  external = false,
}: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex min-h-11 items-center gap-4 rounded-card border border-border bg-bg p-4 transition-colors duration-150 ease-out hover:border-border-strong xs:p-5"
    >
      <span
        aria-hidden
        className="grid size-11 shrink-0 place-items-center rounded-button bg-surface-2 text-accent"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-label-sm text-muted">{label}</span>
        <span className="block text-copy font-medium wrap-anywhere text-text">
          {value}
        </span>
      </span>
    </a>
  );
}
