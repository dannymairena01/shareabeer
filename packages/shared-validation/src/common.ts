import { z } from 'zod';

export const privacyLevelSchema = z.enum(['public', 'followers_only', 'private']); // BR-11
export const servingSizeSchema = z.enum(['can', 'bottle', 'draft', 'flight', 'other']);

/**
 * BR-8: canonical beer-style enum. Seeded from an industry taxonomy.
 * Users cannot invent free-text styles; every submission must map to one.
 */
export const beerStyleSchema = z.enum([
  'ipa',
  'hazy_ipa',
  'imperial_ipa',
  'imperial_stout',
  'stout',
  'porter',
  'pilsner',
  'lager',
  'pale_ale',
  'amber_ale',
  'brown_ale',
  'wheat',
  'hefeweizen',
  'saison',
  'sour',
  'lambic',
  'gose',
  'kolsch',
  'barleywine',
  'other',
]);

export const uuidSchema = z.string().uuid();
export const isoTimestampSchema = z.string().datetime({ offset: true });

/** BR-5: fine precision persisted for owner, coarse (~500m geohash) exposed to others. */
export const locationSchema = z.object({
  lat: z.number().gte(-90).lte(90),
  lng: z.number().gte(-180).lte(180),
});
export type Location = z.infer<typeof locationSchema>;
