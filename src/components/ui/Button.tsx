import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light";
/** sm draws a 36px button inside a 44px hit area (touch-target rule). */
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Stretch to full width below 400px (PRD responsive table). */
  stretch?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
    /** Opens in a new tab with rel="noopener noreferrer". */
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | NativeButtonProps;

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent",
  secondary: "border border-border-strong text-text",
  light: "bg-text text-on-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 rounded-button px-3 text-label-sm",
  md: "h-11 gap-2 rounded-button px-4 text-label",
  lg: "h-12 gap-2 rounded-button-lg px-5 text-label",
};

const base =
  "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap select-none transition-[filter,transform,border-color,color] duration-150 ease-out";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    stretch = false,
    className,
    children,
    ...rest
  } = props;

  // sm: the link/button is a transparent 44px-tall hit area and the visible
  // 36px pill is an inner span, which also carries hover, press and focus.
  const compact = size === "sm";

  const classes = compact
    ? cn(
        "group inline-flex h-11 shrink-0 items-center focus-visible:outline-none",
        stretch && "w-full xs:w-auto",
        className,
      )
    : cn(
        base,
        "hover:brightness-108 active:scale-98",
        stretch && "w-full xs:w-auto",
        variants[variant],
        sizes[size],
        className,
      );

  const content = compact ? (
    <span
      className={cn(
        base,
        "w-full group-hover:brightness-108 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent group-active:scale-98",
        variants[variant],
        sizes.sm,
      )}
    >
      {children}
    </span>
  ) : (
    children
  );

  if (rest.href !== undefined) {
    const { external, ...anchorProps } = rest;
    return (
      <a
        {...anchorProps}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {content}
    </button>
  );
}
