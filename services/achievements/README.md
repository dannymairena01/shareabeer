# @sab/achievements

Event-driven evaluator for UC-19 achievements.

**Inputs:** `user_activity` events (`beer_logged`, `session_ended`,
`country_first_logged`, etc.) from the API gateway via BullMQ.

**Outputs:** deterministic unlocks written to `user_achievements` with an
idempotency key (BR-18) so replays never double-unlock.

**Responsible-drinking framing (BR-14):** rule catalog emphasizes variety,
discovery, and social participation — never raw consumption volume as a
headline metric.
