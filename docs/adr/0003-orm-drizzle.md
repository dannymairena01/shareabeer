# ADR 0003 — ORM: Drizzle on Postgres

**Status:** Accepted · **Date:** 2026-04-17 · **Deciders:** Danny Mairena

## Context

We need a database access layer that runs well on Node and on Edge runtimes,
supports Postgres features we rely on (JSONB, partial unique indexes, full-
text search, enums), and keeps CI fast. The data model (see
`packages/db/src/schema/`) is heavily relational (follows, feeds, sessions,
moderation, audit logs) and includes a partial unique index that enforces
BR-12 (at most one active session per user).

## Options considered

1. **Drizzle ORM + drizzle-kit**
2. **Prisma**
3. **Kysely**

## Decision

Option **(1)** — Drizzle.

## Consequences

**Pros**
- SQL-first API: queries stay legible and close to Postgres.
- First-class Postgres features: JSONB typing, partial indexes, `pgEnum`,
  `pg_trgm` via raw SQL where we need it, custom indexes with `WHERE` clauses.
- Edge-runtime friendly — matters if we later move tRPC procedures to
  Cloudflare Workers or Vercel Edge for the ranked-feed reads.
- No codegen blocking CI. Types come from schema builders directly.
- Native Postgres migration files (no bespoke DSL to learn).

**Cons / accepted trade-offs**
- Smaller ecosystem of tutorials than Prisma. Worth it for the performance
  and Postgres feature fit.
- Migration diffing is less magical than Prisma's; we will review
  drizzle-kit output before applying.

**Why not Prisma:** heavyweight codegen step, weaker JSONB ergonomics, and
a history of regressions in the migration engine. The query engine process
is also an operational wart we don't need.

**Why not Kysely:** lacks a schema-first migration story; we would hand-write
every migration, which slows iteration.
