-- Share a Beer — extensions required by later migrations.
-- Supabase's managed Postgres keeps non-builtin extensions in `extensions`;
-- we reference them via the default search_path (see supabase/config.toml).

create extension if not exists "pg_trgm" with schema extensions;   -- beer/brewery search (UC-3, UC-14)
create extension if not exists "citext"  with schema extensions;   -- future case-insensitive columns
create extension if not exists "pgcrypto" with schema extensions;  -- gen_random_uuid fallback
