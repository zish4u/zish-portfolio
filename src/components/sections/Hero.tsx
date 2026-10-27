import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { CodeCard } from "@/components/ui/CodeCard";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { engineerCode } from "@/lib/engineerCode";

export function Hero() {
  const { hero } = site;

  return (
    <section id="top" aria-labelledby="top-heading" className="scroll-mt-24">
      <div className="site-container pt-14 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div>
            <p className="flex items-start gap-2 font-mono text-tag text-body">
              <span
                aria-hidden
                className="mt-1.25 size-1.5 shrink-0 bg-success"
              />
              {/* Each "•" part stays on one line; wrapping only happens between parts. */}
              <span>
                {profile.availability.split(" • ").map((part, i) => (
                  <Fragment key={part}>
                    {i > 0 && " • "}
                    <span className="whitespace-nowrap">{part}</span>
                  </Fragment>
                ))}
              </span>
            </p>
            <h1
              id="top-heading"
              className="mt-5 font-display text-h1-mobile text-text md:text-h1"
            >
              <span className="block">{hero.greeting}</span>
              <span className="text-muted">{hero.lead} </span>
              <span className="text-accent">{hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-lead text-body">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#work" size="lg" stretch>
                {hero.primaryCta}
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.8} />
              </Button>
              <Button href="#contact" size="lg" variant="secondary" stretch>
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <CodeCard
            label={hero.codeLabel}
            fileName={hero.codeFile}
            language={hero.codeLanguage}
            lines={engineerCode(profile, hero.codeExperienceComment)}
          />
        </div>

        <ul
          aria-label={hero.stackLabel}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 md:mt-18 md:justify-between"
        >
          {profile.stackStrip.map((item) => (
            <li
              key={item}
              className="font-display text-copy font-medium text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
