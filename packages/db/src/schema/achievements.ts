/**
 * Achievements and user achievements.
 * UC-19 at MVP level; BR-14 (responsible-drinking framing), BR-18 (deterministic
 * rules + idempotent keys so replays don't double-unlock).
 */
import {
  jsonb,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users.js';

export const achievements = pgTable('achievements', {
  achievementId: uuid('achievement_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 80 }).notNull().unique(),
  description: varchar('description', { length: 240 }).notNull(),
  /** Deterministic rule (BR-18). Interpreted by services/achievements. */
  criteria: jsonb('criteria').notNull(),
  iconUrl: varchar('icon_url', { length: 1024 }),
  tier: varchar('tier', { length: 8, enum: ['bronze', 'silver', 'gold'] }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userAchievements = pgTable(
  'user_achievements',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    achievementId: uuid('achievement_id')
      .notNull()
      .references(() => achievements.achievementId),
    unlockedAt: timestamp('unlocked_at', { withTimezone: true }).notNull(),
    /** BR-18 — prevents double-unlocks during event replay. */
    idempotencyKey: varchar('idempotency_key', { length: 128 }).notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.achievementId] }),
    uniqueIndex('user_achievements_idemp_uq').on(t.idempotencyKey),
  ],
);
