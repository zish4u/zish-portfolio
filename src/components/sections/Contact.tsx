import { Mail, MessageCircle, Smartphone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactCard } from "@/components/ui/ContactCard";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { InfoChip } from "@/components/ui/InfoChip";
import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

type Channel = {
  channel: string;
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
};

/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x" */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const iconClass = "size-5";

export function Contact() {
  const copy = site.contact;

  const channels: Channel[] = [
    {
      channel: "email",
      href: `mailto:${contact.email}`,
      label: copy.emailLabel,
      value: contact.email,
      icon: <Mail className={iconClass} strokeWidth={1.8} />,
    },
    ...(contact.phone
      ? [
          {
            channel: "phone",
            href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
            label: copy.phoneLabel,
            value: contact.phone,
            icon: <Smartphone className={iconClass} strokeWidth={1.8} />,
          },
        ]
      : []),
    {
      channel: "linkedin",
      href: contact.linkedin,
      label: copy.linkedinLabel,
      value: displayUrl(contact.linkedin),
      icon: <LinkedInIcon className={iconClass} />,
      external: true,
    },
    {
      channel: "github",
      href: contact.github,
      label: copy.githubLabel,
      value: displayUrl(contact.github),
      icon: <GitHubIcon className={iconClass} />,
      external: true,
    },
  ];

  if (contact.whatsapp) {
    channels.push({
      channel: "whatsapp",
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
      label: copy.whatsappLabel,
      value: contact.whatsapp,
      icon: <MessageCircle className={iconClass} strokeWidth={1.8} />,
      external: true,
    });
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-18"
    >
      <div className="site-container">
        <div className="rounded-panel border border-border bg-surface p-6 xs:p-8 md:p-14">
          <p className="font-mono text-eyebrow text-accent">{copy.eyebrow}</p>
          <h2
            id="contact-heading"
            className="mt-2.5 font-display text-h2-mobile text-text md:text-contact"
          >
            <span className="block">{copy.heading}</span>
            <span className="block text-accent">{copy.highlight}</span>
          </h2>
          <p className="mt-5 max-w-xl text-copy text-body">{copy.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <InfoChip label={copy.noticeLabel} value={contact.noticePeriod} />
            </li>
            <li>
              <InfoChip label={copy.basedInLabel} value={profile.basedIn} />
            </li>
            <li>
              <InfoChip label={copy.timezoneLabel} value={contact.timezone} />
            </li>
            <li>
              <InfoChip label={copy.visaLabel} value={contact.visa} />
            </li>
          </ul>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {channels.map((channel) => (
              // An odd last card spans both columns so it never sits alone.
              <li key={channel.label} className="md:last:odd:col-span-2">
                <ContactCard {...channel} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
