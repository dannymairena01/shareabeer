# ADR 0002 — API contract: tRPC end-to-end

**Status:** Accepted · **Date:** 2026-04-17 · **Deciders:** Danny Mairena

## Context

The mobile client and admin console are both TypeScript and are the only
consumers of our API at launch. We need a contract layer that gives us
end-to-end types, fast iteration, and no codegen blocking CI.

## Options considered

1. **tRPC** — types flow directly from server handlers to clients.
2. **REST + OpenAPI** — with generated types via `openapi-typescript`.
3. **GraphQL** — with `graphql-codegen`.

## Decision

Option **(1)** — tRPC. We expose a thin REST adapter under `/rest/v1/*` if
and when external (non-TS) partners need it, generated from the same tRPC
router so there is one source of truth.

## Consequences

**Pros**
- Zero codegen step — types flow from `AppRouter` to `@trpc/react-query` on
  the client the moment the server compiles.
- Strong Zod integration — the same schemas validate wire payloads and
  infer DTO types (`@sab/shared-validation` is already wired this way).
- Fastest iteration velocity for a small TS team.
- Works over HTTP and WebSockets; easy to move subscriptions to WS later.

**Cons / accepted trade-offs**
- Locks the public-facing API to TS clients until we ship the REST adapter.
  Acceptable: we have no external consumers in the v1 scope.
- Not an open standard like OpenAPI. We mitigate by generating an OpenAPI
  spec from the tRPC router (trpc-to-openapi) once external partners arrive.

**Why not OpenAPI-first:** codegen step adds CI friction and risks drift
between the spec and the handler at the scale we're at.

**Why not GraphQL:** query-shape flexibility is not a feature we need for
an internal mobile client; overfetching is already solved by tRPC procedures.
