# vld.oxog.dev — marketing site

A Next.js 16 site for [@oxog/vld](https://github.com/ersinkoc/vld), the
zero-dependency TypeScript validation library.

## Stack

Everything is pinned to the current latest release.

| Package            | Version  |
| ------------------ | -------- |
| next               | 16.4.0   |
| react / react-dom  | 19.3.0   |
| tailwindcss        | 4.3.3    |
| motion             | 14.0.0   |
| lenis              | 1.3.26   |
| lucide-react       | 1.53.0   |
| shiki              | 4.5.0    |
| @oxog/vld          | 3.0.11   |

Next 16 Cache Components and Turbopack are enabled. Tailwind v4 is wired
through `@tailwindcss/turbopack` in `next.config.ts`.

**Node >= 20.9.0 is required.** Next 16 hard-fails the build on older Node, and
Nixpacks defaults to Node 18, so `nixpacks.toml`, `.nvmrc` and `engines.node`
all pin Node 22 for the container build.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Design notes

**Dark is the default.** The inline script in `src/lib/theme.tsx` resolves the
theme before first paint, so there is no flash. The `<html>` class is the single
source of truth and React only reads it, through `useSyncExternalStore` — which
also keeps hydration clean.

**The site runs the real library.** `@oxog/vld` is a real dependency, not a mock:

- `src/components/playground.tsx` builds a real schema, parses the payload you
  type, and renders the actual `VldError.issues`. The `parses/s` readout in the
  title bar is measured live in your browser.
- `src/components/i18n-showcase.tsx` calls the real `setLocale()` and re-parses
  the same invalid payload in 32 languages.

**The hero canvas** (`src/components/validation-gate.tsx`) streams raw input
particles toward a schema gate: valid data passes through and turns accent
coloured, invalid data is rejected at the boundary and scatters. It is DPR
aware, pauses off-screen, and renders a single static frame when the user
prefers reduced motion.

**Syntax highlighting** is done at build time by Shiki with dual light/dark
themes, so no highlighter ships to the client. The result is wrapped in
`use cache` because Shiki reads the clock, which Next's prerender guard
otherwise rejects.

## Layout

```
src/
  app/
    layout.tsx            fonts, metadata, theme bootstrap
    page.tsx              section order
    globals.css           design tokens + base layer
    opengraph-image.tsx   generated OG card
    sitemap.ts robots.ts
  components/
    hero.tsx              headline, install bar, spotlight, playground
    playground.tsx        live VLD validation
    validation-gate.tsx   hero canvas
    benchmarks.tsx features.tsx how-it-works.tsx dropin.tsx
    quick-start.tsx code-block.tsx code-tabs.tsx
    api-explorer.tsx i18n-showcase.tsx
    nav.tsx footer.tsx smooth-scroll.tsx
  lib/
    theme.tsx site-data.ts code.ts
```

## Visual smoke test

Playwright is intentionally **not** a committed dependency — its install hook
downloads a browser, which is dead weight (and a failure mode) in the
container build. Install it on demand:

```bash
npm run build && npm start
npm i -D playwright && npx playwright install chromium
npm run screenshot   # writes ./shots, reports console errors
```