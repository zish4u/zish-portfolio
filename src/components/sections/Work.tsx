import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function Work() {
  const labels = {
    live: site.work.liveLabel,
    inProgress: site.work.inProgressLabel,
    visit: site.work.visitLabel,
    view: site.work.viewProject,
  };
  const featured = projects.filter((project) => project.featured);
  // Secondary cards only render when filled (PRD FR 8).
  const secondary = projects.filter((project) => !project.featured).slice(0, 2);

  return (
    <Section id="work" copy={site.sections.work}>
      <div className="grid gap-4">
        {featured.map((project) => (
          <ProjectCard key={project.name} project={project} labels={labels} />
        ))}
        {secondary.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {secondary.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                labels={labels}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
