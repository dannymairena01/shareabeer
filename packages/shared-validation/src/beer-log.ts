import { z } from 'zod';

import { locationSchema, servingSizeSchema, uuidSchema } from './common.js';

/** UC-2 / UC-3 / UC-6 — create a beer log, possibly inside an active session. */
export const beerLogCreateSchema = z
  .object({
    beerId: uuidSchema,
    sessionId: uuidSchema.optional(),
    servingSize: servingSizeSchema,
    userRating: z.number().int().min(1).max(5).optional(),
    tastingNote: z.string().max(280).optional(),
    location: locationSchema.optional(),
    loggedAt: z.string().datetime({ offset: true }).optional(), // defaults to now()
  })
  .strict();
