/**
 * Users, profiles, age verification.
 * UC-1 (register), UC-21 (profile / privacy), BR-1, BR-4, BR-6, BR-19.
 */
import {
  boolean,
  index,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { accountStatus, ageVerificationDecision, dmPolicy, privacyLevel } from './enums.js';

export const users = pgTable(
  'users',
  {
    userId: uuid('user_id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 320 }).notNull().unique(),
    displayName: varchar('display_name', { length: 30 }).notNull(),
    handle: varchar('handle', { length: 20 }).notNull().unique(),
    status: accountStatus('status').notNull().default('pending_age_verification'),
    ageVerified: boolean('age_verified').notNull().default(false),
    // BR-19 — at most one handle change per 30 days; enforced in the API layer.
    lastHandleChangeAt: timestamp('last_handle_change_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('users_handle_lower_idx').on(t.handle)],
);

export const profiles = pgTable('profiles', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.userId, { onDelete: 'cascade' }),
  bio: varchar('bio', { length: 160 }),
  avatarUrl: varchar('avatar_url', { length: 1024 }),
  websiteUrl: varchar('website_url', { length: 1024 }),
  favoriteStyles: jsonb('favorite_styles').$type<string[]>().notNull().default([]),
  privacyDefault: privacyLevel('privacy_default').notNull().default('public'),
  dmPolicy: dmPolicy('dm_policy').notNull().default('everyone'),
  notificationPrefs: jsonb('notification_prefs')
    .$type<Record<string, boolean>>()
    .notNull()
    .default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/**
 * BR-1 + BR-6 — retained independently of account deletion for compliance.
 * PII from the verification provider is *not* persisted here; only the
 * provider_reference and the pass/fail decision.
 */
export const ageVerificationRecords = pgTable(
  'age_verification_records',
  {
    recordId: uuid('record_id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    region: varchar('region', { length: 8 }).notNull(),
    method: varchar('method', { length: 64 }).notNull(),
    providerReference: varchar('provider_reference', { length: 128 }).notNull(),
    decision: ageVerificationDecision('decision').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('age_verification_user_idx').on(t.userId)],
);
