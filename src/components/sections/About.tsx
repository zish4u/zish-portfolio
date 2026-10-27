import { Section } from "@/components/layout/Section";
import { BentoCard } from "@/components/ui/BentoCard";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function About() {
  const labels = site.about;
  const nationality =
    profile.relocateTo.length > 0
      ? `${profile.nationality} · ${labels.relocateNote} ${profile.relocateTo.join(", ")}`
      : profile.nationality;

  return (
    <Section id="about" copy={site.sections.about}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <BentoCard span={2}>
          <div className="space-y-3 text-copy-sm text-body">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </BentoCard>

        <BentoCard label={labels.yearsLabel}>
          <p className="mt-auto pt-10 font-display text-stat text-text">
            {profile.yearsExperience}
            <span className="text-accent">+</span>
          </p>
        </BentoCard>

        <BentoCard label={labels.currentlyLabel}>
          <p className="mt-auto pt-10 text-label font-medium text-text">
            {profile.currently}
          </p>
        </BentoCard>

        <BentoCard span={2} label={labels.nationalityLabel}>
          <p className="mt-1 text-label font-medium text-text">{nationality}</p>
          {profile.visaNote && (
            <p className="mt-0.5 text-label-sm text-muted">
              {profile.visaNote}
            </p>
          )}
        </BentoCard>

        <BentoCard span={2} label={labels.languagesLabel}>
          <p className="mt-1 text-label font-medium text-text">
            {profile.languages.join(", ")}
          </p>
        </BentoCard>
      </div>
    </Section>
  );
}
