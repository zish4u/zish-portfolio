import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light";
type Size = "md" | "lg";

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
  md: "h-11 rounded-button px-4",
  lg: "h-12 rounded-button-lg px-5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    stretch = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 text-label font-medium whitespace-nowrap select-none",
    "transition-[filter,transform,border-color,color] duration-150 ease-out hover:brightness-108 active:scale-98",
    stretch && "w-full xs:w-auto",
    variants[variant],
    sizes[size],
    className,
  );

  if (rest.href !== undefined) {
    const { external, ...anchorProps } = rest;
    return (
      <a
        {...anchorProps}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
