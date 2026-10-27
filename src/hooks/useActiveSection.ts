"use client";

import { useEffect, useState } from "react";

/**
 * Id of the `main section[id]` crossing a line just above the viewport middle,
 * or null. Sections without a nav link (hero, education) clear the highlight.
 */
export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = [...sections].find((section) =>
          visible.get(section.id),
        );
        setActive(current?.id ?? null);
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
