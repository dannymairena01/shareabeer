/**
 * @sab/db — Drizzle schema for Share a Beer.
 *
 * Schema is split by domain. Each file is cross-referenced to the use cases
 * and business rules it implements. The root re-exports everything so callers
 * can `import { posts } from '@sab/db/schema'` without knowing the file layout.
 */
export * from './enums.js';
export * from './users.js';
export * from './beers.js';
export * from './beer-logs.js';
export * from './posts.js';
export * from './sessions.js';
export * from './social.js';
export * from './achievements.js';
export * from './moderation.js';
