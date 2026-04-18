import 'node:process';

import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DATABASE_URL_MIGRATIONS ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL_MIGRATIONS (or DATABASE_URL) must be set for drizzle-kit.');
}

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: { url: databaseUrl },
  casing: 'snake_case',
  strict: true,
  verbose: true,
});
