import { z } from 'zod';

import { privacyLevelSchema, uuidSchema } from './common.js';

/**
 * UC-4 — create a beer post.
 *
 * BR-9: ≤10 media assets. Size/type checks are applied at upload time, not here.
 * BR-11: privacy dictates feed eligibility.
 * BR-13: tagged users enter a pending state until they accept.
 */
export const hashtagSchema = z
  .string()
  .min(1)
  .max(50)
  .regex(/^[a-zA-Z0-9_]+$/, 'Hashtags must be alphanumeric or underscore, no spaces or #.');

export const postCreateSchema = z
  .object({
    mediaIds: z.array(uuidSchema).min(1).max(10),
    beerLogId: uuidSchema.optional(),
    caption: z.string().max(2200).optional(),
    hashtags: z.array(hashtagSchema).max(30).default([]),
    privacy: privacyLevelSchema,
    taggedUserIds: z.array(uuidSchema).max(20).default([]),
  })
  .strict();

export const commentCreateSchema = z
  .object({
    postId: uuidSchema,
    text: z.string().min(1).max(1000),
    parentCommentId: uuidSchema.optional(), // depth=1 enforced in API layer (UC-10)
  })
  .strict();
