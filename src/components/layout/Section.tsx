import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SectionCopy, SectionId } from "@/types/content";

type SectionProps = {
  id: SectionId;
  copy: SectionCopy;
  children: ReactNode;
};

/** Standard page section: 72px rhythm, eyebrow + h2, content 40px below. */
export function Section({ id, copy, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24 py-18">
      <div className="site-container">
        <SectionHeader
          id={headingId}
          eyebrow={copy.eyebrow}
          heading={copy.heading}
        />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
