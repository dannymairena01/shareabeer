/**
 * @sab/shared-validation — Zod schemas, single source of truth for wire DTOs.
 *
 * Enforces the business rules cited inline. All API handlers, mobile forms,
 * and admin forms validate against these schemas; deriving types from the
 * same schema (see @sab/shared-types) keeps validator and compiler in lockstep.
 */
export * from './common.js';
export * from './profile.js';
export * from './beer-log.js';
export * from './post.js';
export * from './session.js';
