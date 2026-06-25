# Fullstack Starter

A minimal fullstack template built with Vite, React, TypeScript, Tailwind CSS,
TanStack Router, TanStack Query, shadcn/ui, Express, Drizzle ORM, Drizzle Kit,
and MySQL.

The running application intentionally ships without a demo business domain,
product API, database table, or migration. Small disposable examples show the
preferred fullstack patterns without becoming part of the product.

## Commands

```bash
pnpm install
pnpm run init:git
pnpm dev
pnpm build
pnpm start
pnpm preview
docker build -t fullstack-starter .
```

`pnpm dev` runs Vite and the Express API server together. Vite proxies `/api/*`
to the local API port. Development prefers API port `4001`; when that port is
busy, the startup script selects a free port and passes it to both processes.
Use the `[fullstack-starter] API ready on :PORT` banner when calling Express
directly, or use the Vite URL and its `/api/*` proxy.

`pnpm build` outputs the browser app to `dist/client` and compiles the Express
API server to `dist/server`. `pnpm start` serves both from one Node process.

React routes use hash history and Vite uses `base: "./"` so the generated
client works without rewrite rules and can be served from a subdirectory.
Auto code splitting is enabled. The initial HTML and TanStack Router both show
a small loading state marked with `data-app-loading` until the first route
renders, avoiding a misleading blank page during the initial route chunk load.

## Structure

```text
src/
  components/ui/      # Editable shadcn/ui primitives
  hooks/              # Shared frontend hooks
  lib/                # Shared frontend utilities and query client
  routes/             # TanStack Router file-based routes
  styles.css          # Tailwind entry and global tokens
server/
  app.ts              # Express app composition
  db.ts               # Generic server-only Drizzle connection
  middleware/         # Shared Express middleware
  routes/health.ts    # Infrastructure health endpoint
  schema.ts           # Empty product schema starting point
examples/             # Disposable fullstack pattern references
docs/
  openapi.yaml        # Runtime HTTP contract
  auth-and-permissions.md
  deployment.md
drizzle.config.ts     # Drizzle Kit configuration
```

## Starting Product Work

The examples are reference-only and are not imported by the application:

- `examples/schema.ts` shows a small Drizzle table.
- `examples/api-route.ts` shows validation and an Express router.
- `examples/query-component.tsx` shows a TanStack Query owner component.

For the first real product workflow:

1. Inspect only the relevant examples.
2. Implement product-specific files in `src/`, `server/`, and `docs/`.
3. Update `server/app.ts` and `docs/openapi.yaml` when adding product routes.
4. Generate and review a migration if persistence is needed.
5. Delete the entire `examples/` directory before finishing.

Do not import, rename, or ship the example domain as product code.

## Database

The starter has no business tables or committed migrations by default.
`server/schema.ts` is the schema source of truth when the product needs
persistence.

```bash
# After adding or changing product tables:
pnpm db:generate

# After the platform injects DATABASE_URL:
pnpm db:migrate
```

Generated migrations and snapshots live under `drizzle/`. Use `pnpm db:push`
only for disposable prototype databases where committed migration history is
not required.

`DATABASE_URL` is server-only. Never expose it to browser code, hardcode it, or
ask the user for platform-managed credentials.

## API

The runtime exposes only `GET /api/health` until the product needs additional
routes. Unknown `/api/*` routes return JSON 404 responses instead of frontend
HTML.

The health response includes a stable service marker so port conflicts are easy
to diagnose:

```json
{ "ok": true, "service": "fullstack-starter" }
```

Keep `docs/openapi.yaml` aligned whenever adding or changing runtime APIs.

## Git Baseline

Generated projects should start with a clean Git history. `pnpm run init:git`
initializes a project-local repository when needed and creates:

```text
chore: create project from starter
```

After completing a cohesive requested change, run the relevant checks and
create a scoped commit.

## Agent Guidance

`AGENTS.md` defines repository conventions, the disposable-example workflow,
and verification requirements for coding agents. The project also includes the
official shadcn skill under `.verdent/skills/shadcn/`.
