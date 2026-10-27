# zishan.dev

Personal portfolio of **Zishan Faridy, Frontend Engineer** — a single static page built with the same stack it describes.

## Stack

- **Next.js 16** (App Router, fully static) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `@theme` (`src/app/globals.css`)
- **next/font** — Space Grotesk, Inter, JetBrains Mono (self-hosted variable fonts)
- **lucide-react** icons, inline SVG brand marks
- **Vitest** unit tests · **Playwright** end-to-end tests · **Lighthouse CI**
- **GitHub Actions** CI · deployed on **Vercel**

## Getting started

Requires Node.js ≥ 24.22.1 and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Local dev server                                      |
| `pnpm build`     | Production build (static)                             |
| `pnpm lint`      | ESLint                                                |
| `pnpm typecheck` | Generates route types, then `tsc --noEmit`            |
| `pnpm format`    | Prettier (with Tailwind class sorting)                |
| `pnpm test`      | Vitest unit + component tests                         |
| `pnpm test:e2e`  | Playwright on the production build (desktop + mobile) |
| `pnpm test:all`  | Both test suites                                      |

Set `LAUNCH_CHECK=1` to also run the launch gates (no `[PLACEHOLDER]` text left, resume PDF served).

## Project structure

```
src/
  app/            layout, page, metadata, OG image, icons, sitemap, robots
  components/
    layout/       NavBar, MobileMenu, SkipLink, Section, Footer, JsonLd
    sections/     Hero, About, Experience, Skills, Work, Education, Contact
    ui/           Button, Tag, SectionHeader, CodeCard, cards, InfoChip
  content/        all copy and personal data (typed)
  hooks/          useActiveSection, useClickTracking
  lib/            formatting, analytics, engineer.ts code generator
  types/          content types
test/
  unit/           Vitest: helpers, components, content rules
  e2e/            Playwright: smoke, navigation, links/analytics, responsive, SEO
```

**Editing content:** everything on the page comes from `src/content/*.ts`, typed by `src/types/content.ts`. Components never hard-code copy. The hero's `engineer.ts` card is generated from `profile.ts` at build time, so it can't drift from the rest of the page.

## Quality

- **Accessibility:** WCAG 2.1 AA — one `h1`, landmarks, skip link, visible 2px focus ring, 44px touch targets, keyboard-operable mobile menu with focus trap, `prefers-reduced-motion` respected.
- **Tests:** content rules (title, wording, ordering, bullet length) are enforced in unit tests; the e2e suite covers layout from 360px to 1440px, the mobile menu, analytics events and SEO output.
- **CI:** every push runs format, lint, typecheck, unit tests, build, e2e and Lighthouse (mobile, median of 3 runs).
