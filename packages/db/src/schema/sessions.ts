/**
 * Drinking sessions.
 * UC-5, UC-6, UC-7; BR-12 (one active session per user, auto-end at 8h idle / 12h total),
 * BR-13 (participant consent), BR-14 (responsible-drinking framing).
 */
import { sql } from 'drizzle-orm';
import {
  index,
  numeric,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { participantState, sessionStatus } from './enums.js';
import { users } from './users.js';

export const sessions = pgTable(
  'sessions',
  {
    sessionId: uuid('session_id').primaryKey().defaultRandom(),
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => users.userId),
    startTime: timestamp('start_time', { withTimezone: true }).notNull(),
    endTime: timestamp('end_time', { withTimezone: true }),
    status: sessionStatus('status').notNull().default('active'),
    venueName: varchar('venue_name', { length: 80 }),
    locationLat: numeric('location_lat', { precision: 9, scale: 6 }),
    locationLng: numeric('location_lng', { precision: 9, scale: 6 }),
    locationGeohashCoarse: varchar('location_geohash_coarse', { length: 7 }),
    // BR-12 auto-end: tracks last beer-log timestamp so the auto-end worker can
    // scan `now() - last_log_at > 8h OR now() - start_time > 12h` cheaply.
    lastLogAt: timestamp('last_log_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // BR-12: at most one active session per user — partial unique index.
    uniqueIndex('sessions_active_per_user_uniq')
      .on(t.ownerId)
      .where(sql`status = 'active'`),
    index('sessions_owner_status_idx').on(t.ownerId, t.status),
  ],
);

export const sessionParticipants = pgTable(
  'session_participants',
  {
    participantId: uuid('participant_id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessions.sessionId, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    state: participantState('state').notNull().default('pending'), // BR-13
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
  },
  (t) => [uniqueIndex('session_participants_uq').on(t.sessionId, t.userId)],
);
