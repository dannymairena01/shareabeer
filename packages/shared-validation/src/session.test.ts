import { describe, expect, it } from 'vitest';

import { sessionEndSchema } from './session.js';

describe('sessionEndSchema', () => {
  it('accepts a publish decision with a caption', () => {
    const result = sessionEndSchema.safeParse({
      sessionId: '00000000-0000-0000-0000-000000000000',
      decision: 'publish_public',
      caption: 'Great night.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects discard with a caption', () => {
    const result = sessionEndSchema.safeParse({
      sessionId: '00000000-0000-0000-0000-000000000000',
      decision: 'discard',
      caption: 'should fail',
    });
    expect(result.success).toBe(false);
  });
});
