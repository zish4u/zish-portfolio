"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClickTracking } from "@/hooks/useClickTracking";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function NavBar() {
  const active = useActiveSection();
  // The nav is on every page view, so it hosts the page-wide click tracking.
  useClickTracking();

  return (
    // The blurred band lives on a pseudo-element: backdrop-filter on the header
    // itself would trap the mobile menu's fixed backdrop inside the header.
    <header className="sticky top-0 z-50 pt-3 pb-2 before:absolute before:inset-0 before:-z-10 before:bg-bg/85 before:backdrop-blur-md md:pt-4">
      <div className="site-container">
        <nav
          aria-label={site.navLabel}
          className="relative flex h-15 items-center justify-between gap-3 rounded-nav border border-border bg-surface pr-3 pl-5"
        >
          <a
            href="#top"
            className="inline-flex min-h-11 items-center font-display text-copy font-bold tracking-[-0.01em] text-text"
          >
            {site.wordmark}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((link) => {
              const current = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-button px-3 text-label transition-colors duration-150 ease-out hover:text-text",
                      "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-accent after:transition-opacity after:duration-150",
                      current
                        ? "text-text after:opacity-100"
                        : "text-body after:opacity-0",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <Button
              href={contact.resumePath}
              download
              variant="light"
              size="sm"
              data-event="resume_download"
            >
              <Download aria-hidden className="size-3.5" strokeWidth={1.8} />
              {site.resumeLabel}
            </Button>
            <MobileMenu links={site.nav} labels={site.menu} active={active} />
          </div>
        </nav>
      </div>
    </header>
  );
}
