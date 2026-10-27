import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";

export function NavBar() {
  return (
    <header className="sticky top-4 z-50 site-container">
      <nav
        aria-label={site.navLabel}
        className="relative flex h-15 items-center justify-between gap-3 rounded-nav border border-border bg-surface pr-2 pl-5"
      >
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-display text-copy font-bold tracking-[-0.01em] text-text"
        >
          {site.wordmark}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-button px-3 text-label text-body transition-colors duration-150 ease-out hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Button href={contact.resumePath} download variant="light">
            <Download aria-hidden className="size-4" strokeWidth={1.8} />
            {site.resumeLabel}
          </Button>
          <MobileMenu links={site.nav} labels={site.menu} />
        </div>
      </nav>
    </header>
  );
}
