import type { StaticImageData } from "next/image";

/** Year and month, e.g. "2023-11". */
export type YearMonth = `${number}-${number}`;

export type Profile = {
  name: string; // "Zishan Faridy"
  title: string; // "Frontend Engineer" — never "Senior" here (see CLAUDE.md)
  availability: string; // hero status line
  summary: string; // one-line hero summary
  about: string[]; // About bento paragraphs
  yearsExperience: number;
  currently: string; // About "Currently" card
  basedIn: string;
  nationality: string;
  visaNote?: string; // About nationality card; hidden when omitted
  languages: string[];
  openTo: string[];
  relocate: boolean;
  coreStack: string[];
  alsoFluent: string[];
  stackStrip: string[]; // hero stack strip, in display order
};

export type Contact = {
  email: string;
  // phone: string; // E.164, e.g. "+91XXXXXXXXXX"
  linkedin: string;
  github: string;
  whatsapp?: string;
  resumePath: string;
  noticePeriod: string;
  timezone: string;
  visa: string;
};

export type Job = {
  role: string;
  company: string;
  location: string;
  start: YearMonth;
  end: YearMonth | null; // null = Present
  points: string[]; // 2–4 bullets
  tags: string[];
};

export type SkillGroup = { title: string; items: string[] };

export type Project = {
  name: string;
  status: "live" | "in-progress";
  featured: boolean;
  label?: string; // compact-card eyebrow, e.g. "Open source / side project"
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
  image?: StaticImageData; // static import, so dimensions are known at build
  imageAlt?: string;
};

export type Education = {
  degree: string;
  institution: string;
  // Optional: the year line on the card is hidden when both are omitted.
  start?: string;
  end?: string;
};

export type Achievement = {
  title: string;
};

export type SectionId =
  "top" | "about" | "experience" | "skills" | "work" | "education" | "contact";

export type NavLink = { label: string; href: `#${SectionId}` };

export type SectionCopy = { eyebrow: string; heading: string };

export type Seo = {
  url: string; // canonical origin, no trailing slash
  title: string;
  description: string; // ≤ 160 characters
  ogAlt: string;
};

export type SiteCopy = {
  wordmark: string;
  seo: Seo;
  skipLink: string;
  nav: NavLink[];
  navLabel: string; // aria-label for the primary nav
  menu: { open: string; close: string };
  resumeLabel: string;
  hero: {
    greeting: string;
    lead: string;
    highlight: string; // accent-colored tail of the H1
    primaryCta: string;
    secondaryCta: string;
    codeFile: string;
    codeLanguage: string;
    codeExperienceComment: string; // trailing comment on the `experience` line
    codeLabel: string; // aria-label for the code card figure
    stackLabel: string; // aria-label for the stack strip
  };
  sections: Record<Exclude<SectionId, "top" | "contact">, SectionCopy>;
  about: {
    yearsLabel: string;
    currentlyLabel: string;
    nationalityLabel: string;
    languagesLabel: string;
    relocateNote: string;
  };
  experience: { presentLabel: string };
  work: {
    liveLabel: string;
    inProgressLabel: string;
    visitLabel: string; // "Visit" + project host
    viewProject: string;
  };
  education: { achievementLabel: string };
  contact: {
    eyebrow: string;
    heading: string;
    highlight: string;
    intro: string;
    noticeLabel: string;
    basedInLabel: string;
    timezoneLabel: string;
    visaLabel: string;
    emailLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    whatsappLabel: string;
  };
  footer: { builtWith: string };
};
