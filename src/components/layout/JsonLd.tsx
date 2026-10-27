import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

/** schema.org Person (PRD §2 SEO). */
export function JsonLd() {
  const [locality] = profile.basedIn.split(",");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: site.seo.url,
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin, contact.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: locality.trim(),
      addressCountry: "IN",
    },
    nationality: { "@type": "Country", name: "India" },
    knowsAbout: profile.coreStack,
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}
