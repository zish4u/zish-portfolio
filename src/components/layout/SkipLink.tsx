import { site } from "@/content/site";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-100 inline-flex min-h-11 -translate-y-24 items-center rounded-button bg-accent px-4 text-label font-medium text-on-accent focus:translate-y-0"
    >
      {site.skipLink}
    </a>
  );
}
