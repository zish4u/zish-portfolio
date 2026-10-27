import type { SiteCopy } from "@/types/content";

// UI copy that isn't personal data: nav, section headers, labels, CTAs.
export const site: SiteCopy = {
  wordmark: "zishan.dev",
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  resumeLabel: "Résumé",
  hero: {
    greeting: "Hi, I’m Zishan.",
    lead: "I engineer interfaces that",
    highlight: "ship and scale.",
    primaryCta: "See my work",
    secondaryCta: "Contact me",
    codeFile: "engineer.ts",
    codeLanguage: "TypeScript",
  },
  sections: {
    about: { eyebrow: "// about", heading: "Engineering with ownership." },
    experience: { eyebrow: "// experience", heading: "Where I’ve shipped." },
    skills: { eyebrow: "// toolkit", heading: "What I work with." },
    work: { eyebrow: "// selected work", heading: "Things I’ve built." },
    education: { eyebrow: "// education", heading: "Foundations." },
  },
  about: {
    yearsLabel: "Years in production",
    currentlyLabel: "Currently",
    nationalityLabel: "Nationality",
    languagesLabel: "Languages",
    relocateNote: "open to relocate",
  },
  work: {
    liveLabel: "Live",
    inProgressLabel: "In progress",
    viewProject: "View project",
  },
  education: { achievementLabel: "Achievement" },
  contact: {
    eyebrow: "// contact",
    heading: "Hiring a frontend engineer?",
    highlight: "Let’s talk.",
    intro:
      "Open to full-time roles in India and the Gulf, including relocation. I usually reply within a day.",
    noticeLabel: "Notice period",
    basedInLabel: "Based in",
    timezoneLabel: "Timezone",
    emailLabel: "Email",
    phoneLabel: "Mobile",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
  footer: { builtWith: "built with next.js + tailwind" },
};
