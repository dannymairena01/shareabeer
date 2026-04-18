# @sab/feed-ranker

Computes the For You ranking (UC-8). Stubbed in Phase 0; Phase 3 implements
reverse-chron + affinity, Phase 7 upgrades to ML-ranked.

**Inputs:** viewer's follow graph, affinity signals (likes, comments, repost
behavior), post recency, engagement velocity, and regional/language filters.

**Outputs:** ranked list of `post_id`s; the API gateway hydrates the DTOs
with privacy and BR-11 filtering applied.
