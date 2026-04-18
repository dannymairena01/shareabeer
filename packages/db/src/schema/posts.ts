/**
 * Posts, media, tags, comments, likes, reposts.
 * UC-4, UC-7 (session post), UC-8, UC-9, UC-10; BR-9, BR-11, BR-13.
 */
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { beerLogs } from './beer-logs.js';
import { commentStatus, participantState, postStatus, privacyLevel } from './enums.js';
import { sessions } from './sessions.js';
import { users } from './users.js';

export const posts = pgTable(
  'posts',
  {
    postId: uuid('post_id').primaryKey().defaultRandom(),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.userId),
    // v1: one beer per post — enforced at the app layer.
    beerLogId: uuid('beer_log_id').references(() => beerLogs.logId),
    // Set when this post is the auto-generated artifact from UC-7 session end.
    sessionId: uuid('session_id').references(() => sessions.sessionId),
    caption: text('caption'),
    hashtags: jsonb('hashtags').$type<string[]>().notNull().default([]),
    privacy: privacyLevel('privacy').notNull(), // BR-11
    status: postStatus('status').notNull().default('published'),
    // Session posts render a stats card; we cache the computed summary here.
    statsJson: jsonb('stats_json'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    removedAt: timestamp('removed_at', { withTimezone: true }),
    hiddenAt: timestamp('hidden_at', { withTimezone: true }),
  },
  (t) => [
    index('posts_author_created_idx').on(t.authorId, t.createdAt),
    index('posts_feed_idx').on(t.status, t.privacy, t.createdAt),
  ],
);

export const postMedia = pgTable('post_media', {
  mediaId: uuid('media_id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.postId, { onDelete: 'cascade' }),
  kind: varchar('kind', { length: 8, enum: ['photo', 'video'] }).notNull(),
  url: varchar('url', { length: 1024 }).notNull(),
  mimeType: varchar('mime_type', { length: 40 }).notNull(),
  // BR-9 size/duration validated at upload — stored for audit.
  fileSizeBytes: integer('file_size_bytes').notNull(),
  durationSeconds: integer('duration_seconds'),
  transcodeStatus: varchar('transcode_status', {
    length: 16,
    enum: ['pending', 'processing', 'ready', 'failed'],
  })
    .notNull()
    .default('ready'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const postTags = pgTable(
  'post_tags',
  {
    tagId: uuid('tag_id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.postId, { onDelete: 'cascade' }),
    taggerId: uuid('tagger_id')
      .notNull()
      .references(() => users.userId),
    taggeeId: uuid('taggee_id')
      .notNull()
      .references(() => users.userId),
    state: participantState('state').notNull().default('pending'), // BR-13
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
    declinedAt: timestamp('declined_at', { withTimezone: true }),
  },
  (t) => [uniqueIndex('post_tags_uq').on(t.postId, t.taggeeId)],
);

export const likes = pgTable(
  'likes',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.postId, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.postId, t.userId] })],
);

export const comments = pgTable('comments', {
  commentId: uuid('comment_id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.postId, { onDelete: 'cascade' }),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.userId),
  // UC-10 caps thread depth at 1 at launch. We enforce depth=1 in the API;
  // allowing the column keeps us ready for deeper threads later without a migration.
  parentCommentId: uuid('parent_comment_id'),
  text: varchar('text', { length: 1000 }).notNull(),
  status: commentStatus('status').notNull().default('visible'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** BR-11: reposts are only permitted on public posts. Enforced in API layer. */
export const reposts = pgTable(
  'reposts',
  {
    repostId: uuid('repost_id').primaryKey().defaultRandom(),
    reposterId: uuid('reposter_id')
      .notNull()
      .references(() => users.userId),
    originalPostId: uuid('original_post_id')
      .notNull()
      .references(() => posts.postId),
    addedCaption: varchar('added_caption', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('reposts_uq').on(t.reposterId, t.originalPostId)],
);
