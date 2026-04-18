import { z } from 'zod';

import { beerStyleSchema, privacyLevelSchema } from './common.js';

/** UC-21 — profile create / update. BR-19 governs handle-change cool-off in the API layer. */
export const handleSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, 'Handle must be alphanumeric or underscore.');

export const displayNameSchema = z.string().min(2).max(30);

export const dmPolicySchema = z.enum(['everyone', 'mutuals', 'no_one']); // BR-16

export const profileUpdateSchema = z
  .object({
    displayName: displayNameSchema.optional(),
    handle: handleSchema.optional(),
    bio: z.string().max(160).optional(),
    avatarUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional(),
    favoriteStyles: z.array(beerStyleSchema).max(10).optional(),
    privacyDefault: privacyLevelSchema.optional(),
    dmPolicy: dmPolicySchema.optional(),
  })
  .strict();
