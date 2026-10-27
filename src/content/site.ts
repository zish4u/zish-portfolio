import type { SiteCopy } from "@/types/content";

// UI copy that isn't personal data: nav, section headers, labels, CTAs.
export const site: SiteCopy = {
  wordmark: "ZISHAN FARIDY",
  seo: {
    // Fallback only: on Vercel the production domain is used (lib/siteUrl.ts).
    url: "https://zishanfaridy.vercel.app",
    title: "Zishan Faridy — Frontend Engineer (React, Next.js, TypeScript)",
    description:
      "Frontend Engineer with 6+ years building production web apps in React, Next.js and TypeScript. Open to full-time roles in India and the GCC.",
    ogAlt: "Zishan Faridy — Frontend Engineer",
  },
  skipLink: "Skip to content",
  navLabel: "Primary",
  menu: { open: "Open menu", close: "Close menu" },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  resumeLabel: "Resume",
  hero: {
    greeting: "Hi, I’m Zishan.",
    lead: "I engineer interfaces that",
    highlight: "ship and scale.",
    primaryCta: "See my work",
    secondaryCta: "Contact me",
    codeFile: "engineer.ts",
    codeLanguage: "TypeScript",
    codeExperienceComment: "years, and counting",
    codeLabel: "Profile summary written as a TypeScript object",
    stackLabel: "Core stack",
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
    nationalityLabel: "Nationality & visa",
    languagesLabel: "Languages",
    relocateNote: "open to relocate",
  },
  experience: { presentLabel: "Present" },
  work: {
    liveLabel: "Live",
    inProgressLabel: "In progress",
    visitLabel: "Visit",
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
    visaLabel: "Visa status",
    emailLabel: "Email",
    phoneLabel: "Mobile",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    whatsappLabel: "WhatsApp",
  },
  footer: { builtWith: "built with next.js + tailwind" },
};
