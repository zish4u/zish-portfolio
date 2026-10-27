"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/content";

type MobileMenuProps = {
  links: NavLink[];
  labels: { open: string; close: string };
  /** Id of the section currently in view. */
  active: string | null;
};

const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * Nav links below 900px: dims and locks the page behind it, Esc closes,
 * focus is trapped while open.
 */
export function MobileMenu({ links, labels, active }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    if (!root) return;

    root.querySelector<HTMLElement>(`#${CSS.escape(panelId)} a`)?.focus();
    const { documentElement } = document;
    documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the menu breakpoint.
    const desktop = window.matchMedia("(width >= 56.25rem)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, panelId]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-button text-text transition-colors duration-150 ease-out hover:bg-surface-2"
      >
        {open ? (
          <X aria-hidden className="size-5" strokeWidth={1.8} />
        ) : (
          <Menu aria-hidden className="size-5" strokeWidth={1.8} />
        )}
      </button>

      {/* Dims the page; sits under the nav bar inside the header's stack. */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-5 bg-bg/80 backdrop-blur-sm"
        />
      )}

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 rounded-nav border border-border-strong bg-surface p-2"
      >
        <ul className="divide-y divide-border">
          {links.map((link) => {
            const current = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center justify-between rounded-button px-4 text-copy font-medium transition-colors duration-150 ease-out hover:bg-surface-2",
                    current ? "text-accent" : "text-text",
                  )}
                >
                  {link.label}
                  {current && (
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-accent"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
