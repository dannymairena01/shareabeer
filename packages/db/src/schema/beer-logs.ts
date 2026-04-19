/**
 * Beer logs — canonical activity event (drives UC-17 stats and UC-19 achievements).
 * UC-2, UC-3, UC-6; BR-5, BR-14.
 *
 * Note: session linkage (sessionId) points at sessions.sessionId declared in
 * ./sessions.ts — we rely on drizzle's lazy reference resolution to avoid a
 * circular import. The FK is enforced at the SQL level; if you see type
 * errors here, check that sessions.ts loads before runtime usage of this file.
 */
import { index, integer, numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { beers } from './beers.js';
import { servingSize } from './enums.js';
import { sessions } from './sessions.js';
import { users } from './users.js';

export const beerLogs = pgTable(
  'beer_logs',
  {
    logId: uuid('log_id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    beerId: uuid('beer_id')
      .notNull()
      .references(() => beers.beerId),
    sessionId: uuid('session_id').references(() => sessions.sessionId),
    servingSize: servingSize('serving_size').notNull(),
    userRating: integer('user_rating'), // 1–5 enforced in the API layer
    tastingNote: varchar('tasting_note', { length: 280 }),
    // BR-5: fine precision belongs to the owner; a coarse geohash is exposed.
    locationLat: numeric('location_lat', { precision: 9, scale: 6 }),
    locationLng: numeric('location_lng', { precision: 9, scale: 6 }),
    locationGeohashCoarse: varchar('location_geohash_coarse', { length: 7 }),
    loggedAt: timestamp('logged_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('beer_logs_user_logged_idx').on(t.userId, t.loggedAt),
    index('beer_logs_beer_idx').on(t.beerId),
    index('beer_logs_session_idx').on(t.sessionId),
  ],
);
