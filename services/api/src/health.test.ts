import { describe, expect, it } from 'vitest';

import { appRouter } from './router.js';

describe('appRouter.health', () => {
  it('returns ok: true', async () => {
    const caller = appRouter.createCaller({
      hono: {} as never,
      user: null,
      requestId: 'test',
    });
    const result = await caller.health();
    expect(result).toEqual({ ok: true });
  });
});
