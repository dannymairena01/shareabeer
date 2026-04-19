-- Share a Beer — local dev seed, run by `supabase db reset` right after
-- migrations. Idempotent (ON CONFLICT DO NOTHING) so re-running is safe.
--
-- Scope:
--   1. Global region → minimum drinking age table (BR-1)
--   2. First community-guidelines version (BR-4)

-----------------------------------------------------------------
-- 1. region_drinking_ages (BR-1, BR-2)
-----------------------------------------------------------------
-- ISO-3166-1 alpha-2 by default; subdivisions ("US-PR", "CA-QC") only where
-- the drinking age diverges from the country default. `promotion_restricted`
-- flags jurisdictions where BR-2 says to suppress alcohol-promotion
-- discovery features. This seed covers major markets; expand per region
-- legal review before production launch.

insert into public.region_drinking_ages (region_code, min_drinking_age, display_name, promotion_restricted, notes) values
  -- North America
  ('US',     21, 'United States',                 false, '21 nationwide (NMDAA 1984).'),
  ('CA',     19, 'Canada',                        false, 'Default 19; QC / AB / MB are 18.'),
  ('CA-QC',  18, 'Canada — Québec',               false, null),
  ('CA-AB',  18, 'Canada — Alberta',              false, null),
  ('CA-MB',  18, 'Canada — Manitoba',             false, null),
  ('MX',     18, 'Mexico',                        false, null),

  -- United Kingdom & Ireland
  ('GB',     18, 'United Kingdom',                false, null),
  ('IE',     18, 'Ireland',                       false, null),

  -- European Union (selected)
  ('DE',     16, 'Germany',                       false, 'Beer/wine at 16; spirits at 18.'),
  ('FR',     18, 'France',                        false, null),
  ('ES',     18, 'Spain',                         false, null),
  ('IT',     18, 'Italy',                         false, null),
  ('NL',     18, 'Netherlands',                   false, null),
  ('BE',     18, 'Belgium',                       false, 'Beer/wine at 16, spirits at 18 (16 age path out of scope).'),
  ('PT',     18, 'Portugal',                      false, null),
  ('AT',     16, 'Austria',                       false, 'Varies by Land; 16 is the lowest beer/wine floor.'),
  ('SE',     18, 'Sweden',                        false, null),
  ('DK',     18, 'Denmark',                       false, null),
  ('FI',     18, 'Finland',                       false, null),
  ('NO',     18, 'Norway',                        false, null),
  ('CZ',     18, 'Czechia',                       false, null),
  ('PL',     18, 'Poland',                        false, null),

  -- Oceania
  ('AU',     18, 'Australia',                     false, null),
  ('NZ',     18, 'New Zealand',                   false, null),

  -- Asia-Pacific (selected)
  ('JP',     20, 'Japan',                         false, null),
  ('KR',     19, 'South Korea',                   false, null),
  ('SG',     18, 'Singapore',                     false, null),
  ('HK',     18, 'Hong Kong SAR',                 false, null),
  ('TW',     18, 'Taiwan',                        false, null),
  ('TH',     20, 'Thailand',                      true,  'Advertising restrictions; suppress Trending (BR-17).'),
  ('IN',     21, 'India',                         true,  'Varies by state 18/21/25; strict promotion rules.'),

  -- Latin America (selected)
  ('BR',     18, 'Brazil',                        false, null),
  ('AR',     18, 'Argentina',                     false, null),
  ('CL',     18, 'Chile',                         false, null),
  ('CO',     18, 'Colombia',                      false, null),

  -- Middle East / Africa (selected — most are promotion-restricted or out of scope)
  ('ZA',     18, 'South Africa',                  false, null),
  ('AE',     21, 'United Arab Emirates',          true,  'Licensed venues only; consumer logging restricted.'),
  ('IL',     18, 'Israel',                        false, null)
on conflict (region_code) do nothing;

-----------------------------------------------------------------
-- 2. First community guidelines version (BR-4)
-----------------------------------------------------------------
-- Placeholder content — replace with legal-reviewed copy before public launch.
-- version_number must be unique; is_current = true at most once.
insert into public.guidelines_versions (version_number, title, content_markdown, content_hash, effective_date, is_current) values
  (
    1,
    'Share a Beer — Community Guidelines v1',
    e'## Community Guidelines\n\nWelcome to Share a Beer. By using this app you agree to:\n\n- Drink responsibly. Never drink and drive.\n- Respect other users. No harassment, hate speech, or minor-targeted content.\n- Do not post content that encourages excessive or dangerous drinking.\n- Report content you believe violates these guidelines.\n\nThese guidelines will be updated periodically; material updates will require re-acknowledgment on next sign-in (BR-4).',
    'placeholder-hash-v1-replace-before-launch',
    now(),
    true
  )
on conflict (version_number) do nothing;
