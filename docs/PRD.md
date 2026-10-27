# Portfolio Website — PRD, Tech Stack & Design Doc

Oct 27, 2026 · @Zish

## 1. Overview

Build a single-page personal portfolio for Zishan Faridy (Frontend Engineer, 6+ years) that gets him shortlisted for full-time frontend roles in India and the GCC. The approved canvas design ("profile as a component": dark graphite UI, violet accent, `engineer.ts` hero card) is the visual source of truth.

**Goals**

- A recruiter understands role, seniority, core stack and availability within 10 seconds of landing.
- Every contact route (email, mobile, LinkedIn, GitHub, résumé PDF) is one click away from the hero and the contact section.
- The site itself proves frontend quality: Lighthouse 95+ in all four categories, WCAG 2.1 AA, fully responsive from 360 px.

**Audience**

| Reader | What they look for | Where the page answers it |
| --- | --- | --- |
| HR / recruiter (India, UAE, KSA, Qatar) | Title, years, location, notice period, relocation, résumé | Hero, code card, contact chips, Résumé button |
| Hiring manager / tech lead | Stack depth, ownership, shipped work | Experience timeline, Skills, Selected Work |
| Interviewer (pre-call) | Talking points to probe | Experience bullets, project cards |

**Success criteria**

- Live on a custom domain with HTTPS, linked from LinkedIn, Naukri and the CV.
- No placeholder text (`[BRACKETS]`) anywhere in production.
- Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO) on mobile.
- Contact links and résumé download tracked in analytics.

**Non-goals**

- No freelancing, services, pricing or "hire me for projects" language anywhere. All copy targets full-time employment.
- No blog, CMS, login or backend in v1.
- No unverifiable metrics or claims; every number must be one Zishan can defend in an interview.

## 2. Product requirements (PRD)

One scrolling page with eight sections in this order; each section has an `id` so the nav can anchor-link to it.

| # | Section | `id` | Must contain |
| --- | --- | --- | --- |
| 1 | Nav bar | — | `zishan.dev` wordmark, links to About / Experience / Skills / Work / Contact, Résumé download button; mobile menu below 900 px |
| 2 | Hero | `top` | Availability line ("Available for full-time roles — India & GCC"), H1 "Hi, I'm Zishan. I engineer interfaces that ship and scale.", one-line summary, "See my work" + "Contact me" CTAs, `engineer.ts` code card, stack strip |
| 3 | About | `about` | Bento grid: summary (2 paragraphs), 6+ years card, Currently card, Nationality card, Languages card |
| 4 | Experience | `experience` | Vertical timeline of 4 roles, newest first: role, company, location, dates, 2–4 bullets, tech tags |
| 5 | Skills | `skills` | 9 category cards with item count and chips |
| 6 | Selected Work | `work` | CalQ featured card (live badge, description, tags, link, screenshot in browser frame) + up to 2 secondary project cards |
| 7 | Education | `education` | B.Sc. Engg (CS), 12th, 10th cards; Merit-cum-Means Scholarship achievement strip |
| 8 | Contact | `contact` | Headline "Hiring a frontend engineer? Let's talk.", notice period / based in / timezone chips, 4 contact cards (Email, Mobile, LinkedIn, GitHub), footer |

### Functional requirements

1. All content (profile, jobs, skills, projects, education, contact) lives in typed data files, never hard-coded in components.
2. Nav links smooth-scroll to sections; the active section is highlighted while scrolling (IntersectionObserver).
3. Below 900 px the nav links collapse into an accessible menu button (`aria-expanded`, Esc closes, focus trapped while open).
4. Résumé button downloads `/resume/Zishan-Faridy-Resume.pdf` (`download` attribute).
5. Email opens `mailto:`, mobile opens `tel:`, LinkedIn and GitHub open in a new tab with `rel="noopener noreferrer"`.
6. Optional: a WhatsApp link in contact (`https://wa.me/<number>`) — common with Gulf recruiters.
7. Analytics events: `resume_download`, `contact_click` (with `channel`), `project_click` (with `project`).
8. Secondary project cards render only when filled; an empty project array hides them (no placeholder cards in production).

### Placeholders to fill before launch

| Field | Where it shows | Value |
| --- | --- | --- |
| Email | Contact card, nav-free mailto | \[EMAIL\] |
| Mobile | Contact card | \[+91 XXXXX XXXXX\] |
| LinkedIn URL | Contact card | \[LINKEDIN\_URL\] |
| GitHub URL | Contact card | \[GITHUB\_URL\] |
| Résumé PDF | Nav button | \[RESUME\_PDF\] |
| Notice period | Contact chip | \[X days\] |
| Languages | About bento | \[LANGUAGES\] |
| Photo (optional) | About or hero | \[PHOTO\] |
| Education years + institutes | Education cards | \[YEAR\], \[UNIVERSITY\], \[BOARD / SCHOOL\] |
| CalQ screenshot | Work featured card | \[CALQ SCREENSHOT\] |
| Project 2 / 3 | Work secondary cards | \[PROJECT NAME\], description, URL |

### Content rules

- The headline title is "Frontend Engineer" everywhere (hero, code card, meta title, CV header, LinkedIn headline). "Senior Frontend Engineer" appears only as the job title of the current Webpotli role in the Experience timeline.
- No freelancing or services language; no revenue or impact numbers that cannot be defended.
- Experience bullets start with a verb and stay under \~25 words.
- The site copy must match the résumé PDF.

### SEO

- `<title>`: "Zishan Faridy — Frontend Engineer (React, Next.js, TypeScript)".
- Meta description ≤ 160 characters; canonical URL; Open Graph + Twitter card with a 1200×630 OG image (name, title, accent).
- JSON-LD `Person` schema: name, jobTitle, sameAs (LinkedIn, GitHub), address locality Patna, nationality Indian.
- `sitemap.xml`, `robots.txt`, favicon set (SVG + 180 px Apple touch icon).

### Accessibility (WCAG 2.1 AA)

- Text contrast ≥ 4.5:1 (body and small labels), ≥ 3:1 for large text and UI borders that carry meaning.
- One `h1`; sections use `h2`, cards `h3`. Skip-to-content link.
- Visible focus ring (2 px accent outline, 2 px offset) on every interactive element; touch targets ≥ 44 px.
- Code card: `<figure>` with `aria-label`; decorative SVGs `aria-hidden`; icon-only buttons have `aria-label`.
- Respect `prefers-reduced-motion`: disable scroll smoothing and reveal animations.

### Performance budget

| Metric | Target (mobile, 4G) |
| --- | --- |
| LCP | < 1.8 s |
| CLS | < 0.05 |
| INP | < 150 ms |
| JS shipped (first load) | < 90 KB gzipped |
| Lighthouse (all 4) | ≥ 95 |

## 3. Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS, statically generated and deployed on Vercel — the same stack the site advertises, so the code itself is a work sample.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js, latest stable, App Router, fully static (SSG) | Matches the headline skill; zero server cost; best-in-class SEO and Core Web Vitals |
| Language | TypeScript, `strict: true` | Typed content data catches missing fields at build time |
| Styling | Tailwind CSS v4 with design tokens in `@theme` (CSS variables) | Tokens from section 4 map 1:1 to utilities; no runtime CSS |
| Fonts | `next/font/google`: Space Grotesk (500/600/700), Inter (400/500/600), JetBrains Mono (400/500) | Self-hosted, preloaded, no layout shift |
| Icons | `lucide-react` (stroke icons, tree-shaken) + inline SVG for GitHub/LinkedIn | Matches the 1.8 px stroke style in the design |
| Animation | CSS transitions only; optional `motion` for section reveal | Keeps first-load JS under budget |
| Content | Typed TS files in `src/content/` | No CMS needed for one person; easy to edit with Claude Code |
| Analytics | Vercel Web Analytics (or GA4 via `@next/third-parties`) | Track résumé downloads and contact clicks |
| SEO | Next.js Metadata API, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, JSON-LD | All generated at build time |
| Quality | ESLint (next config), Prettier + `prettier-plugin-tailwindcss`, `tsc --noEmit` | Clean, consistent code if a reviewer opens the repo |
| Testing | Playwright smoke test (links, menu, anchors) + Lighthouse CI | Guards the 95+ score on every push |
| CI/CD | GitHub Actions (lint, typecheck, build, Lighthouse) + Vercel Git integration for preview and production deploys | Shows the CI/CD experience listed on the CV |
| Hosting | Vercel (Hobby plan) with a custom domain | Free for a personal site, automatic HTTPS, global CDN |
| Domain | `zishan.dev` or `zishanfaridy.com` (check availability) | `.dev` reads well for developers and forces HTTPS |
| Package manager | pnpm | Fast installs; lockfile committed |

Keep the repository public on GitHub with a clear README, since hiring managers may open it.

## 4. Design doc

Dark graphite surfaces, one violet accent, three typefaces, a 4 px spacing grid; values below are exact from the approved canvas and become Tailwind `@theme` tokens.

### Color tokens

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | #0C0C0F | Page background, contact cards |
| `--surface` | #131317 | Cards, nav bar, code card |
| `--surface-2` | #1C1C22 | Chips, tags, icon tiles, file tab |
| `--surface-3` | #18181D | CalQ screenshot panel |
| `--border` | #27272A | Card and divider borders |
| `--border-strong` | #3F3F46 | Hover border, dashed cards, secondary button |
| `--text` | #EDEDEF | Headings, primary text |
| `--text-body` | #A1A1AA | Body copy |
| `--text-muted` | #8E8E98 | Labels, dates, footer (≈ 6:1 on bg) |
| `--text-chip` | #D4D4D8 | Tag and chip text |
| `--accent` | #A78BFA | Links, highlights, primary button fill, current-job dot |
| `--accent-hover` | #C4B5FD | Link hover |
| `--success` | #4ADE80 | "Available" dot, Live badge |
| `--dot-past` | #52525B | Past-job timeline dots |

Code card syntax colors: keyword #C084FC, string #86EFAC, number/boolean #FDBA74, comment #8E8E98, punctuation #D4D4D8. Primary button text on accent is #0C0C0F.

### Typography

| Role | Font | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| H1 (hero) | Space Grotesk | 64 / 1.02 (44 on mobile) | 700 | -0.04em |
| H2 (section) | Space Grotesk | 44 / 1.1 (32 on mobile) | 700 | -0.03em |
| Contact H2 | Space Grotesk | 52 / 1.05 | 700 | -0.035em |
| Stat number | Space Grotesk | 56 / 1 | 700 | -0.04em |
| H3 (card) | Space Grotesk | 22 (job), 32 (featured) | 600–700 | -0.01em |
| Body large | Inter | 18 / 1.65 | 400 | 0 |
| Body | Inter | 15–16 / 1.65–1.7 | 400 | 0 |
| Label | Inter | 13–14 | 400–500 | 0 |
| Eyebrow (`// about`) | JetBrains Mono | 13 | 400 | 0 |
| Tag / chip | JetBrains Mono | 12 | 400 | 0 |
| Code card | JetBrains Mono | 14 / 1.85 | 400 | 0 |

### Spacing, radius, layout

- Container: `max-width: 1200px`, horizontal padding 40 px (20 px below 900 px).
- Section rhythm: 72 px top and bottom; eyebrow → H2 gap 10 px; H2 → content 36–40 px.
- Card padding 24–28 px (featured 36 px, contact panel 56 px); grid gap 16 px.
- Radius: chips 7–8 px, buttons 10–12 px, cards 16 px, featured/project cards 20 px, contact panel 24 px, pills 999 px.
- Borders are always 1 px; no shadows, no gradients.

### Components

| Component | Anatomy | States |
| --- | --- | --- |
| `NavBar` | Rounded bar (60 px, radius 14), wordmark `zishan.dev`, links, light Résumé button | Link hover → `--text`; active section link → `--text` + accent underline; mobile menu |
| `Button` | Variants: `primary` (accent fill, dark text), `secondary` (border-strong outline), `light` (#EDEDEF fill); height 42–50 px | Hover: brightness 1.08; focus ring; pressed: scale 0.98 |
| `SectionHeader` | Mono eyebrow `// name` in accent + Space Grotesk H2 | — |
| `CodeCard` | File tab (`engineer.ts`), language label, syntax-highlighted `pre` | Static; text selectable |
| `BentoCard` | Surface card; spans 1 or 2 of 4 columns | Hover: border → `--border-strong` |
| `TimelineItem` | 28 px rail (14 px ring dot + 1 px line) + job card | Current job dot = accent; past = `--dot-past` |
| `Tag` | Mono 12 px, `--surface-2` fill, border, radius 7 | — |
| `SkillCard` | Title + zero-padded count (`08`) + chips | Hover border |
| `ProjectCard` | `featured` (2-column with browser frame) or `compact` (dashed until filled) | Hover border; link arrow nudges 2 px |
| `ContactCard` | 44 px icon tile + label + value | Hover border; full card is the link |
| `InfoChip` | "Notice period \[X days\]" style pill on `--surface-2` | — |

### Responsive behavior

| Breakpoint | Change |
| --- | --- |
| ≥ 1200 px | Full layout as designed |
| 900–1199 px | Container shrinks fluidly; hero stays 2 columns |
| < 900 px | Hero, featured project stack to 1 column; bento 2 columns (wide cards full width); skills, education, contact 1 column; nav links → menu button; H1 44 px, H2 32 px |
| < 400 px | Code card font 12.5 px, `pre` wraps; buttons full width |

### Motion

- Hover transitions 150 ms ease-out on border-color, color and transform.
- Optional section fade-up (8 px, 300 ms) once on first view; disabled under `prefers-reduced-motion`.
- No parallax, no typing animation on the code card, no auto-playing carousels.

## 5. Architecture

A single static route (`/`) composed of section components that read from typed content files; all personal data is edited in `src/content/` only.

```
portfolio/
├─ public/
│  ├─ resume/Zishan-Faridy-Resume.pdf
│  ├─ images/calq.webp
│  └─ images/profile.webp            (optional)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  fonts, metadata, JSON-LD, analytics
│  │  ├─ page.tsx                    composes the sections
│  │  ├─ globals.css                 Tailwind + @theme tokens
│  │  ├─ opengraph-image.tsx
│  │  ├─ sitemap.ts / robots.ts
│  │  └─ icon.svg
│  ├─ components/
│  │  ├─ layout/   NavBar, MobileMenu, Footer, SkipLink
│  │  ├─ sections/ Hero, About, Experience, Skills, Work, Education, Contact
│  │  └─ ui/       Button, SectionHeader, CodeCard, BentoCard, TimelineItem,
│  │               Tag, SkillCard, ProjectCard, ContactCard, InfoChip
│  ├─ content/
│  │  ├─ profile.ts                  name, title, summary, location, availability
│  │  ├─ contact.ts                  email, phone, linkedin, github, resume, notice
│  │  ├─ experience.ts
│  │  ├─ skills.ts
│  │  ├─ projects.ts
│  │  └─ education.ts
│  ├─ hooks/useActiveSection.ts       IntersectionObserver for nav highlight
│  ├─ lib/analytics.ts                track(event, props)
│  └─ types/content.ts
├─ tests/smoke.spec.ts
├─ .github/workflows/ci.yml
└─ CLAUDE.md                          points Claude Code to this doc
```

### Data model (`src/types/content.ts`)

```ts
export type Profile = {
  name: string;            // "Zishan Faridy"
  title: string;           // "Frontend Engineer"
  summary: string;
  yearsExperience: number; // 6
  basedIn: string;         // "Patna, India"
  nationality: string;     // "Indian"
  languages: string[];
  openTo: string[];        // ["India", "UAE", "KSA", "Qatar"]
  relocate: boolean;
  coreStack: string[];
  alsoFluent: string[];
};

export type Contact = {
  email: string;
  phone: string;           // E.164, e.g. "+91XXXXXXXXXX"
  linkedin: string;
  github: string;
  whatsapp?: string;
  resumePath: string;
  noticePeriod: string;    // "30 days"
  timezone: string;        // "IST (UTC+5:30)"
};

export type Job = {
  role: string;
  company: string;
  location: string;
  start: string;           // "2023-11"
  end: string | null;      // null = Present
  points: string[];        // 2–4 bullets
  tags: string[];
};

export type SkillGroup = { title: string; items: string[] };

export type Project = {
  name: string;
  status: "live" | "in-progress";
  featured: boolean;
  description: string;
  tags: string[];
  url?: string;
  repo?: string;
  image?: string;
};

export type Education = {
  degree: string;
  institution: string;
  start?: string;
  end: string;
};
```

The `engineer.ts` code card is generated from `Profile` at build time, so the hero and the About section never drift apart.

## 6. Build plan for Claude Code

Six phases, each one commit and one Claude Code prompt; finish a phase's checks before starting the next.

1. **Scaffold** — `create-next-app` with TypeScript, App Router, Tailwind, ESLint, `src/` dir, pnpm. Add Prettier, `lucide-react`, the three fonts via `next/font`, and the `@theme` tokens from section 4. Add `CLAUDE.md` pointing to this doc.
2. **Content layer** — create `src/types/content.ts` and the six content files from section 5, using the CV text and `[PLACEHOLDER]` values; export typed constants.
3. **UI primitives** — build the `ui/` components (Button, Tag, SectionHeader, cards, InfoChip) with focus rings and hover states.
4. **Sections** — build NavBar + MobileMenu, then Hero (with CodeCard generated from `profile.ts`), About, Experience, Skills, Work, Education, Contact, Footer, matching the canvas spacing and type exactly.
5. **Behavior + SEO** — `useActiveSection` nav highlight, smooth scroll with reduced-motion fallback, analytics events, Metadata API, OG image, JSON-LD, sitemap, robots, favicon.
6. **Quality + deploy** — Playwright smoke test, GitHub Actions CI (lint, typecheck, build, Lighthouse CI), connect to Vercel, attach the custom domain.

Starter prompt for phase 1:

```
Read CLAUDE.md and the PRD/design doc. Scaffold a Next.js App Router project
with TypeScript (strict), Tailwind CSS v4 and pnpm. Add the color, type and
radius tokens from section 4 to globals.css using @theme, load Space Grotesk,
Inter and JetBrains Mono with next/font, and render an empty page using
--bg as the background. Do not build any sections yet.
```

### Acceptance checklist

- [ ] Visually matches the canvas at 1440 px and 390 px
- [ ] All content comes from `src/content/`; no copy hard-coded in components
- [ ] Nav anchors, active highlight and mobile menu work with keyboard only
- [ ] Every link and button has a visible focus ring and is ≥ 44 px tall
- [ ] axe DevTools: zero violations
- [ ] Lighthouse mobile ≥ 95 in all four categories
- [ ] No console errors or hydration warnings
- [ ] No layout shift when fonts load

### Launch checklist

- [ ] Every `[PLACEHOLDER]` replaced (search the repo for `[`)
- [ ] Empty secondary project cards removed
- [ ] Résumé PDF uploaded and matching the site copy and title
- [ ] No freelancing or services wording anywhere
- [ ] OG preview checked with LinkedIn Post Inspector
- [ ] Custom domain live with HTTPS; `www` redirects to apex
- [ ] Analytics receiving `resume_download` and `contact_click`
- [ ] Site URL added to LinkedIn, Naukri, Bayt / GulfTalent profiles and the CV header
- [ ] Public GitHub repo with a README (stack, screenshots, Lighthouse score)
