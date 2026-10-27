# CLAUDE.md — Zishan Faridy Portfolio

Personal portfolio site for job applications (India + GCC). Single static page.

## Source of truth

- Full spec: `docs/PRD.md` (export of "Portfolio Website — PRD, Tech Stack & Design Doc").
  Read it before starting any phase. Sections: 1 Overview, 2 PRD, 3 Tech stack,
  4 Design doc (tokens, type, components, responsive), 5 Architecture, 6 Build plan.
- Visual reference: the approved canvas design (dark graphite, violet accent,
  `engineer.ts` hero code card). Match spacing, type and colors from section 4 exactly.

## Stack

Next.js (App Router, SSG) · TypeScript strict · Tailwind CSS v4 (`@theme` tokens) ·
next/font (Space Grotesk, Inter, JetBrains Mono) · lucide-react · pnpm · Vercel.

## Commands

- `pnpm dev` — local dev server
- `pnpm lint` / `pnpm typecheck` — must pass before every commit
- `pnpm build` — must succeed with zero warnings
- `pnpm test:e2e` — Playwright smoke tests
- `pnpm test` — Vitest unit tests (if added)

## Rules

- All personal content lives in `src/content/*.ts`, typed by `src/types/content.ts`.
  Never hard-code copy inside components.
- Headline title is "Frontend Engineer". "Senior Frontend Engineer" appears only
  on the current Webpotli role in Experience.
- Never add freelancing, services, pricing or "hire me for projects" wording.
- Never invent metrics, clients or claims. Unknown values stay as `[PLACEHOLDER]`.
- Hide project cards that have no real content; no placeholder cards in production.
- Colors only via tokens (`bg-bg`, `text-muted`, `text-accent`…), never raw hex in JSX.
- Accessibility: WCAG 2.1 AA — contrast ≥ 4.5:1, visible focus ring, targets ≥ 44px,
  one h1, semantic landmarks, respect `prefers-reduced-motion`.
- Performance: Lighthouse ≥ 95 (mobile), first-load JS < 90 KB gzipped, no layout shift.
- Prefer Server Components; add `"use client"` only for NavBar/MobileMenu and
  the active-section hook.

## Workflow

- Work one phase of `docs/PRD.md` section 6 at a time; one commit per phase.
- After each phase: run lint, typecheck and build, then summarise what changed.
- Ask before adding any dependency not listed in the stack.
