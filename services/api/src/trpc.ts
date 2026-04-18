import { initTRPC, TRPCError } from '@trpc/server';
import type { Context as HonoContext } from 'hono';

/**
 * tRPC context — populated per-request by the Hono adapter. `user` is null
 * until auth middleware resolves it; age-gated procedures use `ageGated`
 * below, which enforces BR-1 (age verification) + the account-status guard.
 */
export interface TrpcContext {
  hono: HonoContext;
  user:
    | {
        userId: string;
        ageVerified: boolean;
        status: 'active' | 'warned' | 'suspended' | 'banned' | 'pending_age_verification' | 'blocked_underage';
      }
    | null;
  requestId: string;
}

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/** Requires a signed-in user. */
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Sign in required.' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * BR-1 + BR-2 — gate for any content-touching procedure.
 * Never skip this on anything that reads or writes user-generated content.
 */
export const ageGatedProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!ctx.user.ageVerified) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Age verification required.',
    });
  }
  if (ctx.user.status !== 'active') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `Account is ${ctx.user.status}.`,
    });
  }
  return next({ ctx });
});
