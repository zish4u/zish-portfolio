import type { SkillGroup } from "@/types/content";

// Card counts are derived from `items.length`.
export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "App Router · SSR/SSG",
      "TypeScript",
      "JavaScript ES6+",
      "Angular",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "UI & Styling",
    items: [
      "Tailwind CSS",
      "Bootstrap",
      "HeroUI",
      "Angular Material",
      "Responsive Design",
    ],
  },
  {
    title: "State & Data",
    items: ["Context API", "React Query", "REST APIs"],
  },
  {
    title: "CMS",
    items: ["WordPress", "Headless WP", "WPGraphQL", "Directus", "Strapi"],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "GitHub Actions",
      "Docker",
      "GCP",
      "DigitalOcean",
      "Fly.io",
      "Vercel",
      "Netlify",
      "cPanel",
    ],
  },
  {
    title: "Backend (working)",
    items: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "Sequelize",
      "TypeORM",
      "Supabase",
      "JWT",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira"],
  },
  {
    title: "Analytics",
    items: [
      "Google Tag Manager",
      "Google Analytics",
      "Meta Pixel",
      "Glance Ads SDK",
    ],
  },
  {
    title: "AI-Assisted Dev",
    items: ["Claude Code"],
  },
];
