/**
 * Community guidelines versioning and regional drinking-age table.
 * UC-1 (community guidelines acknowledgment at registration, BR-4);
 * BR-1 (region-aware legal drinking age — seeded globally per the
 * "available everywhere in the world" product direction).
 */
import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users.js';

/**
 * BR-4 — we track *versions* of the community guidelines + responsible-
 * drinking notice. Material updates mark a new version `is_current = true`;
 * the user's most-recent ack must match the current version or they are
 * re-prompted on next sign-in.
 */
export const guidelinesVersions = pgTable(
  'guidelines_versions',
  {
    versionId: uuid('version_id').primaryKey().defaultRandom(),
    versionNumber: integer('version_number').notNull().unique(),
    title: varchar('title', { length: 160 }).notNull(),
    contentMarkdown: text('content_markdown').notNull(),
    /** SHA-256 of contentMarkdown — lets us detect bit-level drift. */
    contentHash: varchar('content_hash', { length: 64 }).notNull(),
    effectiveDate: timestamp('effective_date', { withTimezone: true }).notNull(),
    isCurrent: boolean('is_current').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // At most one current version at a time — enforced by a partial unique index.
    uniqueIndex('guidelines_current_uniq')
      .on(t.isCurrent)
      .where(sql`${t.isCurrent} = true`),
  ],
);

export const userGuidelinesAcks = pgTable(
  'user_guidelines_acks',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId, { onDelete: 'cascade' }),
    versionId: uuid('version_id')
      .notNull()
      .references(() => guidelinesVersions.versionId),
    ackedAt: timestamp('acked_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.versionId] })],
);

/**
 * BR-1 — canonical region → minimum drinking age lookup. Seeded globally.
 * Region codes are ISO-3166-1 alpha-2, optionally subdivided for places
 * where the drinking age varies by province/state (CA-QC = 18, US = 21).
 */
export const regionDrinkingAges = pgTable('region_drinking_ages', {
  /** "US", "CA-QC", "GB", "DE", etc. */
  regionCode: varchar('region_code', { length: 8 }).primaryKey(),
  minDrinkingAge: integer('min_drinking_age').notNull(),
  /** Human-readable region name for admin/audit displays. */
  displayName: varchar('display_name', { length: 120 }).notNull(),
  /**
   * BR-2 — true when the jurisdiction restricts alcohol-promotion discovery
   * features (Trending, Map View) or bans consumer logging entirely. The
   * feed-ranker, Trending service, and Map View gate reads by this flag.
   */
  promotionRestricted: boolean('promotion_restricted').notNull().default(false),
  notes: varchar('notes', { length: 240 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
