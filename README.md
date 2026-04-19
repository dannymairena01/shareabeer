# Share a Beer

Cross-platform social mobile app for beer lovers. iOS + Android, TypeScript
end-to-end, Expo + React Native on the mobile side, Hono + tRPC + Drizzle
on the backend, Supabase for managed Postgres / Auth / Storage.

Authoritative specs live in [`VISION_AND_SCOPE.md`](./VISION_AND_SCOPE.md)
and [`USE_CASES (1).md`](./USE_CASES%20%281%29.md). Architecture decisions
are in [`docs/adr/`](./docs/adr/).

---

## Prerequisites

- **Node 20.18.0** — `nvm use` reads `.nvmrc`.
- **pnpm 9.15** — `corepack enable && corepack prepare pnpm@9.15.0 --activate`.
- **Docker Desktop** — for local Postgres, Redis, Meilisearch.
- **Expo CLI** — `npm i -g eas-cli` for EAS Build.
- **iOS simulator (Xcode)** and/or **Android emulator (Android Studio)** to
  run the mobile app.

## First-time setup

```bash
# Install all workspace dependencies.
pnpm install

# Start local Postgres + Auth + Storage + Studio (port 54321/54322/54323).
pnpm supabase:start

# Apply migrations + seed (global regions, first guidelines version).
pnpm supabase:reset

# Start Redis + Meilisearch (Supabase does not provide these).
pnpm dev:infra

# Copy env defaults and print the local Supabase keys into .env.
cp .env.example .env
pnpm supabase:status   # copy anon_key, service_role_key, jwt_secret into .env

# Verify the workspace is green.
pnpm -r typecheck
pnpm -r lint
pnpm -r test
```

## Making schema changes

1. Edit files under `packages/db/src/schema/`.
2. `pnpm db:generate` — drizzle-kit writes a diff SQL into
   `packages/db/.drizzle-staging/`.
3. Review, rename to `YYYYMMDDHHMMSS_<name>.sql`, and move the file into
   `supabase/migrations/`.
4. `pnpm supabase:reset` to re-apply the migration chain + seed from scratch.

## Run

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `pnpm dev:api`         | Starts the Hono + tRPC API on `http://localhost:4000` |
| `pnpm dev:recognition` | Starts the recognition service stub on `:4010`        |
| `pnpm dev:mobile`      | Starts the Expo dev server                            |
| `pnpm dev:admin`       | Starts the Next.js admin console on `:3001`           |
| `pnpm dev:infra`       | `docker compose up -d` for Redis + Meilisearch        |
| `pnpm supabase:start`  | `supabase start` — Postgres + Auth + Storage + Studio |
| `pnpm supabase:reset`  | Re-apply migrations + seed (destroys data; dev-only)  |
| `pnpm supabase:status` | Print local Supabase URLs + keys                      |
| `pnpm db:studio`       | Opens Drizzle Studio                                  |

Smoke test the API:

```bash
curl http://localhost:4000/healthz
# => {"ok":true,"service":"api"}
```

## Testing

- Unit: **Vitest** in each package (`pnpm -r test`).
- E2E (mobile): **Maestro** lands in Phase 7.
- Backend integration: dedicated Postgres container in CI (see
  `.github/workflows/ci.yml`).

## Project layout

```
share-a-beer/
  apps/
    mobile/            # Expo React Native app (consumer)
    admin/             # Next.js admin console (internal, UC-25/26)
  services/
    api/               # Hono + tRPC main API (all business logic)
    recognition/       # UC-2 beer-label recognition (wraps Claude vision)
    feed-ranker/       # UC-8 For You ranking (phase 3)
    achievements/      # UC-19 evaluator (phase 5)
  packages/
    db/                # Drizzle schema + client + migrations
    shared-types/      # DTOs inferred from Zod schemas
    shared-validation/ # Zod schemas — single source of truth
    config/            # tsconfig + eslint + prettier presets
  infra/
    docker/            # Local Postgres / Redis / Meilisearch
  docs/
    adr/               # Architecture Decision Records
    runbooks/          # Incident / moderation / age-verification runbooks
```

## Responsible drinking

Every feature decision passes through BR-14: gamification and recaps
emphasize **variety** (styles, countries, breweries) and **social
participation**, not raw consumption volume. Pacing reminders in active
sessions (UC-6) are non-blocking and non-judgmental.

## License

Proprietary — see [`LICENSE`](./LICENSE).
