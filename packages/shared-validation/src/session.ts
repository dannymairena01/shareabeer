import { z } from 'zod';

import { locationSchema, privacyLevelSchema, uuidSchema } from './common.js';

/**
 * UC-5 — start a session. BR-12 enforces one active session per user;
 * the server enforces via a partial unique index on `sessions (owner_id) WHERE status='active'`.
 */
export const sessionStartSchema = z
  .object({
    venueName: z.string().max(80).optional(),
    location: locationSchema.optional(),
    participantUserIds: z.array(uuidSchema).max(20).default([]), // BR-13
  })
  .strict();

/** UC-7 — end a session and decide what happens to it. */
export const sessionEndDecisionSchema = z.enum([
  'publish_public',
  'publish_followers',
  'keep_private',
  'discard',
]);

export const sessionEndSchema = z
  .object({
    sessionId: uuidSchema,
    decision: sessionEndDecisionSchema,
    caption: z.string().max(2200).optional(),
    participantsVisible: z.boolean().default(true),
  })
  .strict()
  .refine((data) => data.decision !== 'discard' || !data.caption, {
    message: 'Caption is not permitted when decision is discard.',
    path: ['caption'],
  });
