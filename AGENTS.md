<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# doctor-tracker

Single Next.js 16.4.5 App Router app (not a monorepo). Source lives entirely under `src/`; entrypoint is `src/app/` (`layout.tsx`, `page.tsx`). React 19.3 with `babel-plugin-react-compiler`. The README is stock create-next-app boilerplate — its file paths are stale.

## Commands (verified)

- `npm run dev` — dev server (Turbopack).
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script; this passes clean.
- `npm run build` — passes. Runs Turbopack build + TypeScript check; `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`.
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`). **Currently exits 1 on pre-existing errors**: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus an unused-import warning in `src/app/page.tsx`. These predate your change — don't chase them, but don't add new lint errors either.
- No test runner exists in this repo. Don't assume Jest/Vitest or add tests for a framework that isn't configured.

## Next 16 conventions

- Follow the managed block above: consult `node_modules/next/dist/docs/` (474 pages, `01-app/` section) before writing Next code — this version diverges from older training data.
- Page/layout props use the global typed-route helpers, no import needed: `function RootLayout(props: LayoutProps<"/">)` (see `src/app/layout.tsx`), `PageProps<'/route'>` for pages.

## UI stack (shadcn + Tailwind v4)

- shadcn components in `src/components/ui/` use **Base UI** (`@base-ui/react`), not Radix — `components.json` sets style `base-nova`. Don't port Radix-based shadcn examples; generate with the `shadcn` CLI (a repo dependency: `npx shadcn add ...`) or match the Base UI pattern already in the files.
- Import `cn` from the `cn` npm package directly (`import { cn } from "cn"`) — that's what all existing components use. `src/lib/utils.ts` only re-exports it.
- Tailwind v4 CSS-first: there is no `tailwind.config.*` or `postcss.config.*` and you shouldn't add one. Styles come from `src/app/globals.css` (`@import "tailwindcss"` + `shadcn/tailwind.css`), wired in via the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
