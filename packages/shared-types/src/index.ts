/**
 * @sab/shared-types — DTOs inferred from @sab/shared-validation Zod schemas.
 *
 * Rule of this package: every type exported here is z.infer<>-derived from a
 * schema in @sab/shared-validation. We never hand-write DTO shapes that are
 * validated at the wire — that risks drift between the validator and the type.
 */
import type { z } from 'zod';

import type {
  beerLogCreateSchema,
  postCreateSchema,
  profileUpdateSchema,
  sessionStartSchema,
  sessionEndSchema,
} from '@sab/shared-validation';

export type BeerLogCreate = z.infer<typeof beerLogCreateSchema>;
export type PostCreate = z.infer<typeof postCreateSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type SessionStart = z.infer<typeof sessionStartSchema>;
export type SessionEnd = z.infer<typeof sessionEndSchema>;

export type PrivacyLevel = 'public' | 'followers_only' | 'private';
export type ServingSize = 'can' | 'bottle' | 'draft' | 'flight' | 'other';
