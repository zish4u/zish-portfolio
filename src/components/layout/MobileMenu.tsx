"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { NavLink } from "@/types/content";

type MobileMenuProps = {
  links: NavLink[];
  labels: { open: string; close: string };
};

const FOCUSABLE = "a[href], button:not([disabled])";

/** Nav links below 900px: Esc closes, focus is trapped while open. */
export function MobileMenu({ links, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    if (!root) return;

    root.querySelector<HTMLElement>(`#${CSS.escape(panelId)} a`)?.focus();

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

    const onPointerDown = (event: PointerEvent) => {
      if (!root.contains(event.target as Node)) setOpen(false);
    };

    // Close if the viewport grows past the menu breakpoint.
    const desktop = window.matchMedia("(width >= 56.25rem)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
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

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 rounded-nav border border-border bg-surface p-2"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-button px-4 text-copy text-body transition-colors duration-150 ease-out hover:bg-surface-2 hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
