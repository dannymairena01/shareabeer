# ADR 0005 — Beer recognition (UC-2): Anthropic Claude Sonnet 4.6 vision

**Status:** Accepted · **Date:** 2026-04-17 · **Deciders:** Danny Mairena

## Context

UC-2 (camera-based beer recognition) is a core differentiator. SM-4 targets
≥ 85% top-1 on clear label photos within 12 months of launch, and the
performance budget is ≤ 3s end-to-end on a good network connection. BR-3
defines confidence-threshold routing (auto-select / picker / fallback).

## Options considered

1. **Multimodal foundation model via API** (Anthropic Claude Sonnet 4.6 vision).
2. **Purpose-built fine-tuned classifier** (training + serving ourselves).
3. **Third-party OCR + fuzzy match** (e.g., Textract + pg_trgm on beer names).

## Decision

Option **(1)** — Anthropic Claude Sonnet 4.6 vision via the Messages API,
with **tool use** for structured JSON output and **prompt caching** on the
fixed system preamble (beer-style taxonomy + extraction schema). Option
(2) becomes viable in a later phase once we have labeled-image volume; the
recognition service is isolated so swapping models doesn't affect clients.

## Consequences

**Pros**

- Fastest path to the SM-4 85% target without training data.
- Tool-use schema makes the output structurally reliable (no brittle string
  parsing). We can strictly validate candidates with Zod.
- Prompt caching on the fixed preamble keeps cost and latency low —
  critical to hitting the ≤ 3s budget for the sync happy path.
- Isolated in `@sab/recognition` — we can swap providers without touching
  the mobile client or the API gateway.

**Cons / accepted trade-offs**

- Per-call cost is higher than a bespoke classifier at scale. Acceptable
  pre-traction; we pre-plan the migration to a fine-tuned model once
  volume and labeled-data programs justify it.
- External dependency on Anthropic availability. We add a fallback to an
  alternate provider (e.g., OpenAI GPT-5 vision) behind a feature flag.

**Why not bespoke classifier at launch:** we don't have the labeled-image
corpus to train one. Bootstrapping it during v1 development would block
the launch.

**Why not OCR + fuzzy match:** labels have huge stylistic variance; OCR
alone yields poor top-1 on craft-beer labels, missing SM-4 entirely.
