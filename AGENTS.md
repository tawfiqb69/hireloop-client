# AGENTS.md

## Commands

- `npm run dev` / `build` / `start` — standard Next.js scripts. No test suite or CI exists; verify changes with `npm run lint`, `npm run typecheck`, and `npm run build`.
- `npm run format` — Prettier only targets `**/*.{ts,tsx}`.
- `npx shadcn@latest add <component>` — add UI components (see conventions below).

## Conventions

- Formatting: Prettier enforces **no semicolons, double quotes, LF line endings** (matters on Windows). Class names in `cn`/`cva` calls are auto-sorted by `prettier-plugin-tailwindcss`.
- Tailwind v4, CSS-first: no `tailwind.config*`; theme lives in `app/globals.css`.
- shadcn uses the `base-nova` style backed by **Base UI (`@base-ui/react`)**, not Radix — don't rewrite installed components to Radix patterns.
- Path alias `@/*` maps to the repo root (e.g. `@/lib/utils`, `@/components/ui/button`).

## Auth (better-auth + MongoDB)

- MongoDB is expected at `mongodb://localhost:27017`, database `hireloopdb`. The connection string is **hardcoded in `lib/auth.ts`** — editing `.env` alone won't change it. `.env` only holds `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`; `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are referenced but not set.
- Auth routes are handled by the catch-all `app/api/auth/[...all]/route.ts`. Wire the server instance with `lib/auth.ts` and the client with `lib/auth-client.ts`.
- Gotcha in `lib/auth-client.ts`: it creates two separate `createAuthClient()` instances — only the first gets `baseURL`. Use the existing `signIn`/`signUp`/`useSession` exports and don't instantiate another client.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
