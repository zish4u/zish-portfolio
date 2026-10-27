import type { Job } from "@/types/content";

// Newest first. The first entry with `end: null` is the current role.
export const experience: Job[] = [
  {
    role: "Senior Frontend Developer",
    company: "Webpotli E Services",
    location: "Patna",
    start: "2023-11",
    end: null,
    points: [
      "Deliver production-grade web products and SEO-optimized platforms with Next.js, React, TypeScript and Tailwind CSS.",
      "Architect frontend systems from the ground up — reusable UI components, API and payment-gateway integrations, CMS-driven platforms.",
      "Primary technical liaison between clients, stakeholders and backend developers; own delivery from architecture to deployment.",
      "Roll out new client instances from a shared codebase on Fly.io with GCP databases, using Docker and GitHub Actions CI/CD.",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Docker",
      "Fly.io",
      "GitHub Actions",
    ],
  },
  {
    role: "Frontend Developer",
    company: "VAMA.APP",
    location: "Gurugram, Delhi NCR",
    start: "2022-06",
    end: "2023-10",
    points: [
      "Built and deployed in-house and partner web apps with Next.js, React.js and Angular.",
      "Configured a headless WordPress + GraphQL setup powering the company blog and content platform.",
      "Mentored and supervised junior developers through project execution.",
    ],
    tags: ["React", "Next.js", "Angular", "WPGraphQL"],
  },
  {
    role: "Tech Lead",
    company: "iNurture Education Solutions",
    location: "Bengaluru",
    start: "2021-07",
    end: "2022-06",
    points: [
      "Led development of a multi-role MEAN-stack application integrated with CRM workflows.",
      "Translated business and product requirements into implementation across frontend and backend modules.",
      "Managed partner-university landing pages for digital marketing and SEO campaigns.",
    ],
    tags: [
      "Angular 12",
      "Angular Material",
      "Node.js",
      "Express",
      "MySQL",
      "Sequelize",
    ],
  },
  {
    role: "Software Engineer",
    company: "San Creative Solutions",
    location: "Patna",
    start: "2020-06",
    end: "2021-06",
    points: [
      "Built drag-and-drop landing-page creation with Angular Material for an education platform.",
      "Developed student and online-test modules, plus admin and student dashboard UIs.",
    ],
    tags: ["Angular", "Angular Material"],
  },
];
