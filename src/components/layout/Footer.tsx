import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-container flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
      <p className="text-label-sm text-muted">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="font-mono text-tag text-muted">{site.footer.builtWith}</p>
    </footer>
  );
}
