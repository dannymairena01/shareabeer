/**
 * Reports, moderation actions, audit logs.
 * UC-25, UC-26; BR-2, BR-21, BR-22.
 *
 * audit_logs is append-only. The migration sets a REVOKE on UPDATE/DELETE and
 * a trigger to refuse writes to `timestamp`; see infra/migrations/*.
 */
import { index, jsonb, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { moderationActionType, reportSubjectType } from './enums.js';
import { users } from './users.js';

export const reports = pgTable(
  'reports',
  {
    reportId: uuid('report_id').primaryKey().defaultRandom(),
    reporterId: uuid('reporter_id')
      .notNull()
      .references(() => users.userId),
    subjectType: reportSubjectType('subject_type').notNull(),
    // Polymorphic — FK integrity is enforced in the application layer per type.
    subjectId: uuid('subject_id').notNull(),
    reasons: jsonb('reasons').$type<string[]>().notNull(),
    notes: varchar('notes', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('reports_subject_idx').on(t.subjectType, t.subjectId)],
);

export const moderationActions = pgTable('moderation_actions', {
  actionId: uuid('action_id').primaryKey().defaultRandom(),
  actorId: uuid('actor_id')
    .notNull()
    .references(() => users.userId),
  subjectType: reportSubjectType('subject_type').notNull(),
  subjectId: uuid('subject_id').notNull(),
  action: moderationActionType('action').notNull(),
  reason: varchar('reason', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const auditLogs = pgTable(
  'audit_logs',
  {
    auditId: uuid('audit_id').primaryKey().defaultRandom(),
    // Null for system-emitted events.
    actorId: uuid('actor_id').references(() => users.userId),
    subjectType: varchar('subject_type', { length: 32 }).notNull(),
    subjectId: uuid('subject_id').notNull(),
    action: varchar('action', { length: 64 }).notNull(),
    reason: varchar('reason', { length: 500 }),
    details: jsonb('details'),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('audit_logs_subject_idx').on(t.subjectType, t.subjectId, t.timestamp)],
);
