type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  /** Id for the h2, so the section can use aria-labelledby. */
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <header className={className}>
      <p className="font-mono text-eyebrow text-accent">{eyebrow}</p>
      <h2
        id={id}
        className="mt-2.5 font-display text-h2-mobile text-text md:text-h2"
      >
        {heading}
      </h2>
    </header>
  );
}
