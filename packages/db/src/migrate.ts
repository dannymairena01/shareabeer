import 'node:process';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function main() {
  const url = process.env.DATABASE_URL_MIGRATIONS ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL_MIGRATIONS (or DATABASE_URL) must be set.');
  }
  const client = postgres(url, { max: 1 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: './migrations' });
  await client.end();
  console.info('Migrations applied.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
