import 'node:process';

import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DATABASE_URL_MIGRATIONS ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL_MIGRATIONS (or DATABASE_URL) must be set for drizzle-kit.');
}

export default defineConfig({
  // Glob so drizzle-kit reads each file directly without going through the
  // re-export barrel (its CJS loader can't follow the `./foo.js` convention
  // we use for runtime-ESM compatibility).
  schema: './src/schema/*.ts',
  // Staging folder. Review the emitted SQL, rename to
  // `YYYYMMDDHHMMSS_<name>.sql`, and move into `supabase/migrations/` so
  // `supabase db reset` picks it up. Single source of truth is
  // supabase/migrations/; drizzle-kit is a schema-diff tool only.
  out: './.drizzle-staging',
  dialect: 'postgresql',
  dbCredentials: { url: databaseUrl },
  casing: 'snake_case',
  strict: true,
  verbose: true,
});
