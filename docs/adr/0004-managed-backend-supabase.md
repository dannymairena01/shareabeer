# ADR 0004 — Managed backend: Supabase

**Status:** Accepted · **Date:** 2026-04-17 · **Deciders:** Danny Mairena

## Context

VISION_AND_SCOPE §4.3 commits to a managed backend at launch to keep ops
cost low; it calls out Supabase or Firebase as the candidates. Our data
model is deeply relational (see schema in `packages/db/src/schema/`), we
need Postgres-specific features (partial unique indexes for BR-12, JSONB
for achievement criteria, pg_trgm for beer search in UC-3), and we want
Apple / Google / email auth with minimum glue code.

## Options considered

1. **Supabase** — Postgres, GoTrue (Auth), Storage, Realtime, Edge Functions.
2. **Firebase** — Firestore, Firebase Auth, Storage, Functions.
3. **Roll our own** — Postgres on AWS RDS, Auth0/Clerk, S3.

## Decision

Option **(1)** — Supabase, with a hard rule: all business logic lives in
our own Node services (`@sab/api` on Hono + tRPC), not in Supabase Edge
Functions or Postgres RPC. Supabase provides Postgres + Auth + Storage;
nothing else.

## Consequences

**Pros**
- Our graph (follows, feed, sessions, moderation, audit logs) is exactly
  what Postgres is best at. Firestore would force awkward denormalization.
- GoTrue handles Apple / Google / email auth out of the box — materially
  less glue code than Firebase Auth + Expo's Apple/Google auth primitives.
- Storage with signed URLs + RLS is convenient for media upload workflows,
  though we still plan to use R2 as the primary media store (cheaper egress).
- Supabase Realtime provides WebSocket subscriptions over Postgres logical
  replication — ready for later phases (session participant updates,
  real-time comment/like fanout).

**Cons / accepted trade-offs**
- Supabase is a younger managed provider than AWS RDS. We mitigate by
  keeping business logic in our own services (so a migration off Supabase
  is mechanical — port Auth to Clerk/Auth0, point Drizzle at RDS, re-attach
  Storage to R2).
- RLS is a powerful feature we deliberately are not relying on — all
  access control goes through the API layer, so the security model is
  auditable in one place.

**Why not Firebase:** Firestore is a poor fit for our data model and
aggregation patterns. The switching cost later would be high.

**Why not self-hosted:** doubles ops burden pre-product-market-fit for no
concrete benefit at our scale.
