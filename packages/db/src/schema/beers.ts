/**
 * Breweries, beers, beer submissions, brewery operators.
 * UC-2, UC-3, UC-14, UC-22, UC-23, UC-24; BR-7, BR-8, BR-10.
 */
import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { beerStyle, submissionStatus } from './enums.js';
import { users } from './users.js';

export const breweries = pgTable(
  'breweries',
  {
    breweryId: uuid('brewery_id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 160 }).notNull(),
    region: varchar('region', { length: 8 }),
    website: varchar('website', { length: 1024 }),
    verified: boolean('verified').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('breweries_name_idx').on(t.name)],
);

/** UC-22/23/24 — out of this engagement's build scope but modeled so later phases don't migrate. */
export const breweryOperators = pgTable(
  'brewery_operators',
  {
    operatorId: uuid('operator_id').primaryKey().defaultRandom(),
    breweryId: uuid('brewery_id')
      .notNull()
      .references(() => breweries.breweryId),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    role: varchar('role', { length: 16, enum: ['admin', 'editor'] }).notNull(),
    mfaEnabled: boolean('mfa_enabled').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('brewery_operators_uq').on(t.breweryId, t.userId)],
);

/** BR-10 — home for the mention_notifications_enabled opt-in flag. */
export const brewerySettings = pgTable('brewery_settings', {
  breweryId: uuid('brewery_id')
    .primaryKey()
    .references(() => breweries.breweryId, { onDelete: 'cascade' }),
  mentionNotificationsEnabled: boolean('mention_notifications_enabled').notNull().default(false),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const beers = pgTable(
  'beers',
  {
    beerId: uuid('beer_id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 160 }).notNull(),
    breweryId: uuid('brewery_id')
      .notNull()
      .references(() => breweries.breweryId),
    style: beerStyle('style').notNull(), // BR-8
    abv: numeric('abv', { precision: 4, scale: 2 }),
    ibu: integer('ibu'),
    tastingNotes: varchar('tasting_notes', { length: 500 }),
    heroImageUrl: varchar('hero_image_url', { length: 1024 }),
    isVerified: boolean('is_verified').notNull().default(false), // BR-7
    communityRating: numeric('community_rating', { precision: 3, scale: 2 }),
    communityRatingCount: integer('community_rating_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('beers_brewery_idx').on(t.breweryId),
    index('beers_style_idx').on(t.style),
    index('beers_name_idx').on(t.name),
  ],
);

/** UC-3 — community-contributed beer entering the moderation queue. */
export const beerSubmissions = pgTable('beer_submissions', {
  submissionId: uuid('submission_id').primaryKey().defaultRandom(),
  submitterId: uuid('submitter_id')
    .notNull()
    .references(() => users.userId),
  name: varchar('name', { length: 120 }).notNull(),
  breweryName: varchar('brewery_name', { length: 160 }).notNull(),
  style: beerStyle('style').notNull(),
  abv: numeric('abv', { precision: 4, scale: 2 }),
  description: varchar('description', { length: 500 }),
  photoUrl: varchar('photo_url', { length: 1024 }),
  status: submissionStatus('status').notNull().default('pending'),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  createdBeerId: uuid('created_beer_id').references(() => beers.beerId),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
