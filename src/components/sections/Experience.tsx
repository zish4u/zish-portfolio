import { Section } from "@/components/layout/Section";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experience } from "@/content/experience";
import { site } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" copy={site.sections.experience}>
      <ol>
        {experience.map((job) => (
          <TimelineItem
            key={`${job.company}-${job.start}`}
            job={job}
            presentLabel={site.experience.presentLabel}
          />
        ))}
      </ol>
    </Section>
  );
}
