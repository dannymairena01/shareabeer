import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema/index.js';

export * as schema from './schema/index.js';
export { sql } from 'drizzle-orm';

export type Database = PostgresJsDatabase<typeof schema>;

export interface CreateDbOptions {
  databaseUrl: string;
  /** Max pool size. Default 10 for API pods, 2 for workers. */
  max?: number;
}

export function createDb({ databaseUrl, max = 10 }: CreateDbOptions): Database {
  const client = postgres(databaseUrl, { max, prepare: false });
  return drizzle(client, { schema });
}
