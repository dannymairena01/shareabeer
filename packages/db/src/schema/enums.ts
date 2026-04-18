import { pgEnum } from 'drizzle-orm/pg-core';

/** UC-1, UC-26. */
export const accountStatus = pgEnum('account_status', [
  'pending_age_verification',
  'blocked_underage',
  'active',
  'warned',
  'suspended',
  'banned',
]);

/** BR-8 — canonical style taxonomy. */
export const beerStyle = pgEnum('beer_style', [
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

export const servingSize = pgEnum('serving_size', ['can', 'bottle', 'draft', 'flight', 'other']);

/** BR-11. */
export const privacyLevel = pgEnum('privacy_level', ['public', 'followers_only', 'private']);

export const postStatus = pgEnum('post_status', ['published', 'draft', 'hidden', 'removed']);
export const commentStatus = pgEnum('comment_status', ['visible', 'hidden', 'pending_review']);

/** BR-12. */
export const sessionStatus = pgEnum('session_status', [
  'active',
  'ended',
  'auto_ended_pending_review',
  'canceled',
]);

export const participantState = pgEnum('participant_state', ['pending', 'accepted', 'declined']);
export const followState = pgEnum('follow_state', ['active', 'pending']);
export const submissionStatus = pgEnum('submission_status', ['pending', 'approved', 'rejected']);

export const reportSubjectType = pgEnum('report_subject_type', [
  'post',
  'comment',
  'dm',
  'beer_submission',
  'account',
]);

export const moderationActionType = pgEnum('moderation_action', [
  'dismiss',
  'warn',
  'remove',
  'suspend_7',
  'suspend_14',
  'suspend_30',
  'suspend_90',
  'ban',
]);

/** BR-1 — stored per verification attempt. */
export const ageVerificationDecision = pgEnum('age_verification_decision', [
  'pass',
  'fail',
  'inconclusive',
]);

/** BR-16 — per-user DM policy. */
export const dmPolicy = pgEnum('dm_policy', ['everyone', 'mutuals', 'no_one']);
