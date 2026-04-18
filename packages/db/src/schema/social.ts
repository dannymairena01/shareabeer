/**
 * Social graph — follows + follow-request cool-offs.
 * UC-8/9 (feeds), UC-20 (follow/unfollow), BR-19.
 */
import {
  index,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { followState } from './enums.js';
import { users } from './users.js';

export const follows = pgTable(
  'follows',
  {
    followId: uuid('follow_id').primaryKey().defaultRandom(),
    followerId: uuid('follower_id')
      .notNull()
      .references(() => users.userId),
    followeeId: uuid('followee_id')
      .notNull()
      .references(() => users.userId),
    state: followState('state').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('follows_uq').on(t.followerId, t.followeeId),
    index('follows_followee_idx').on(t.followeeId),
  ],
);

/** BR-19 — a 7-day cool-off on declined follow requests. */
export const followRequestCooloffs = pgTable(
  'follow_request_cooloffs',
  {
    followerId: uuid('follower_id')
      .notNull()
      .references(() => users.userId),
    followeeId: uuid('followee_id')
      .notNull()
      .references(() => users.userId),
    declinedAt: timestamp('declined_at', { withTimezone: true }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.followerId, t.followeeId] })],
);
