import { z } from 'zod';

import { publicProcedure, router } from './trpc.js';

/**
 * Root tRPC router for @sab/api. Phase 0 ships only a health-check procedure;
 * feature routers (auth, posts, sessions, beers, moderation) land in Phase 1+.
 */
export const appRouter = router({
  health: publicProcedure.query(() => ({ ok: true as const })),
  echo: publicProcedure
    .input(z.object({ message: z.string().min(1).max(200) }))
    .query(({ input }) => ({ echoed: input.message })),
});

export type AppRouter = typeof appRouter;
