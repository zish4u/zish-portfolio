import type { Project } from "@/types/content";
import calqScreenshot from "../../public/prj1.png";

// Secondary (non-featured) cards render only when added here — no placeholder
// cards in production. Template for a compact card:
// { name: "[PROJECT NAME]", status: "in-progress", featured: false,
//   label: "In progress", description: "[...]", tags: [], url: "[URL]" }
export const projects: Project[] = [
  {
    name: "CalQ",
    status: "live",
    featured: true,
    description:
      "An SEO-optimized utility platform built on a reusable Next.js + TypeScript codebase — 100% client-side financial calculators, Hindi/Urdu font converters and mobile-optimized image resizers, shipped rapidly with an AI-assisted workflow.",
    tags: ["Next.js", "TypeScript", "SEO", "Client-side"],
    url: "https://calq.online",
    image: calqScreenshot,
    imageAlt: "CalQ home page: free online tools for India",
  },
];
