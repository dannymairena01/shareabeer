# ADR 0007 — Expo SDK 54 (React Native 0.81.5, React 19.1)

**Status:** Accepted · **Date:** 2026-04-18 · **Deciders:** Danny Mairena

## Context

The initial Phase 0 scaffold picked Expo SDK 52. During bundle
verification the old SDK-52 `@expo/metro-runtime` was incompatible with
Expo Router 4's runtime and bundle failed. Moving to the current SDK 55
exposed a separate codegen bug in React Native 0.85.1
(`Unable to determine event arguments for "onModeChange"` on
`VirtualViewNativeComponent.js`) with no fixed patch release available.

SDK 54 sits one major behind current, ships React Native 0.81.5 and
React 19.1.0, and is the most recent _stable_ SDK widely deployed in
production.

## Decision

Pin the mobile app to Expo SDK 54's bundled module versions (see
`apps/mobile/package.json`), which track `bundledNativeModules.json`
from `expo@54.0.33`.

## Consequences

**Pros**

- Bundling succeeds; `pnpm exec expo export --platform ios` produced a
  2.49 MB Hermes bundle without codegen errors on clean install.
- React Native 0.81.5 is well-supported by every third-party library we
  plan to pull in (age-verification SDKs, Mapbox, Sentry).
- React 19.1 matches what Next.js 15 ships on the admin side, so
  `@types/react` stays on a single major across the workspace.

**Cons / accepted trade-offs**

- One SDK behind current. We accept being roughly three months behind
  bleeding edge in exchange for bundler / codegen stability.
- Some SDK-55-only APIs are unavailable. Nothing in scope depends on them.

**Upgrade path:** re-evaluate at each new SDK release. Expo's bundled
module manifest is the authoritative version list; `npx expo install
--check` (run in `apps/mobile/`) compares installed versions to the
manifest. Bump only when React Native 0.85+ ships a codegen fix and there
is a concrete feature we need.
