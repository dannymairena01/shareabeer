# ADR 0001 — Mobile stack: React Native with Expo (bare workflow), TypeScript

**Status:** Accepted · **Date:** 2026-04-17 · **Deciders:** Danny Mairena

## Context

Share a Beer is a consumer mobile product shipping on iOS and Android in
parallel. VISION_AND_SCOPE §4.3 calls out cross-platform parity as a
business requirement — mixed iOS/Android friend groups mean a feature
shipping first on iOS (or behaving differently on Android) is effectively
broken. The team is small (1 FTE at launch) and will remain small through
the closed beta.

## Options considered

1. **React Native with Expo (bare workflow), TypeScript, Expo Router.**
2. **Flutter (Dart).**
3. **Fully native (SwiftUI + Jetpack Compose, two codebases).**

## Decision

Option **(1)** — React Native with Expo.

## Consequences

**Pros**

- Highest shared-code ratio for cross-platform parity (the business
  requirement that pushed hardest on this decision).
- Largest hiring pool for consumer mobile (TypeScript + React).
- Rich ecosystem for the features in scope: FlashList for feeds, Reanimated
  for interactions, Expo Camera / Location / Notifications, react-native-maps
  for future Map View (FE-25).
- Expo-specific advantages: EAS Build, OTA updates via `expo-updates`
  (ship hotfixes without App Store review), TypeScript-first tooling.
- Beer recognition (UC-2) runs server-side in v1 (see ADR 0005), so we
  don't pay a cross-platform penalty for on-device CV performance.

**Cons / accepted trade-offs**

- Some native SDKs (age-verification, some ad networks later) require
  wrapping. We accept this; the bare workflow supports custom native modules.
- Slightly lower absolute polish than fully native SwiftUI / Compose. The
  VISION_AND_SCOPE targets (cold start ≤ 2.5s, feed refresh ≤ 1s) are
  reachable in RN on mid-tier 2022 devices.

**Why not Flutter:** smaller ecosystem for social / video / chat primitives,
weaker interop with some native SDKs we expect to need (age-verification),
smaller hiring pool.

**Why not fully native:** doubles engineering cost and doubles the risk of
cross-platform drift — unacceptable at this team size.
