# ADR 0006 — pnpm node-linker: hoisted (for React Native + Expo)

**Status:** Accepted · **Date:** 2026-04-18 · **Deciders:** Danny Mairena

## Context

pnpm's default `isolated` node-linker stores every package in
`node_modules/.pnpm/<pkg>@<ver>/node_modules/` and symlinks the resolved
tree into each workspace's own `node_modules/`. This is excellent for Node
server code — strict dependency boundaries, fast installs, tiny disk
footprint — and we relied on it through the initial Phase 0 scaffold.

It is not reliable for React Native. Metro's resolver, React Native's
native-module autolinker, the codegen babel plugin, and the Expo CLI all
assume a flat `node_modules/`. During Phase 0 verification we hit:

1. `@expo/metro-runtime` → `whatwg-fetch` resolution failure even though
   `whatwg-fetch` was installed under `.pnpm/`, because Metro did not
   follow the symlink graph to reach it.
2. Stale variants left over from a package-version transition (SDK 52 →
   55 in our case) persisting in `.pnpm/` because the isolated linker
   dedupes aggressively; a clean re-install was required to break the
   stale symlink structure.

Adding `resolver.unstable_enableSymlinks = true` +
`resolver.unstable_enablePackageExports = true` did not resolve (1). The
Expo monorepo guide explicitly recommends the hoisted linker for this
exact reason.

## Decision

Set `node-linker=hoisted` in the repository-root `.npmrc`.

## Consequences

**Pros**

- Metro, React Native native-module autolinking, and Expo CLI all work
  with zero special configuration.
- Bundle + export succeed; matches how every RN/Expo project documents its
  setup, so we benefit from public tutorials + issue searches without
  translating through pnpm idioms.

**Cons / accepted trade-offs**

- Phantom dependency access: code can sometimes import packages that
  aren't declared in its `package.json`. We rely on ESLint's
  `import/no-extraneous-dependencies` (enabled via the base config) and
  reviewer discipline to catch this.
- Larger `node_modules/` on disk. Negligible for our project size.
- Lockfile is larger. Acceptable.

**Why not keep isolated and patch:** after multiple attempts (the two
`unstable_*` Metro flags, a full clean reinstall, upgrading the Expo SDK)
the symlink chain still broke on transitive resolution. Every hour spent
fighting this was an hour not spent on features.

**Why not yarn:** no reason to add yarn to a TypeScript-first team
already on pnpm for the backend. The hoisted linker gives us npm/yarn
behavior at install time while keeping pnpm as the daily driver.
