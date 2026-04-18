-- Enable extensions we rely on at the schema level.
-- pg_trgm: trigram index on beers.name for UC-3 manual search.
-- citext:  case-insensitive email/handle uniqueness (when we migrate columns).
-- pgcrypto: gen_random_uuid() fallback (Postgres 14+ provides it natively too).
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
