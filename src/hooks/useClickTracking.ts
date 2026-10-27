"use client";

import { useEffect } from "react";
import { isAnalyticsEvent, track } from "@/lib/analytics";

/**
 * One delegated listener for every `[data-event]` element, so server-rendered
 * links (contact cards, project links) are tracked without becoming client
 * components. Extra `data-*` attributes become event props.
 */
export function useClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-event]",
      );
      if (!el) return;
      const { event: name, ...props } = el.dataset;
      if (isAnalyticsEvent(name)) {
        track(name, props as Record<string, string>);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
