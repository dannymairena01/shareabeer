# @sab/recognition

Wraps the multimodal foundation-model endpoint used for beer-label
recognition (UC-2). Ships empty in Phase 0; inference handler lands in
Phase 2.

**Provider:** Anthropic Claude Sonnet 4.6 vision via the Messages API, with
tool-use for structured JSON output and prompt caching on the fixed system
preamble (see `docs/adr/0005-recognition-provider-anthropic.md`).

**BR-3 thresholds** for auto-select / picker / manual fallback are enforced
on the client, not here — this service returns raw candidates with
confidence scores in `[0, 1]`.
