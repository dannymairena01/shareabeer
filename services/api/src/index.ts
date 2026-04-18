import 'node:process';
import { randomUUID } from 'node:crypto';

import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import * as Sentry from '@sentry/node';
import type { Context } from 'hono';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';

import { loadEnv } from './env.js';
import { logger } from './logger.js';
import { appRouter } from './router.js';
import type { TrpcContext } from './trpc.js';

const env = loadEnv();

if (env.SENTRY_DSN_API) {
  Sentry.init({
    dsn: env.SENTRY_DSN_API,
    environment: env.NODE_ENV,
    tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
  });
}

const app = new Hono();

app.use('*', requestId());
app.use('*', cors({ origin: '*', credentials: false }));

app.get('/healthz', (c) => c.json({ ok: true, service: 'api' }));
app.get('/readyz', (c) => c.json({ ok: true, service: 'api' }));

function createTrpcContext(c: Context): TrpcContext {
  return {
    hono: c,
    user: null, // Populated by auth middleware in Phase 1.
    requestId: c.get('requestId') ?? randomUUID(),
  };
}

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    // @hono/trpc-server types createContext as returning Record<string, unknown>.
    // Our TrpcContext is structurally compatible but lacks the index signature,
    // so we cast the function at the boundary. Safe — tRPC treats context as opaque.
    createContext: ((_opts: unknown, c: Context) =>
      createTrpcContext(c) as unknown as Record<string, unknown>) as never,
    onError: ({ error, path }) => {
      logger.error({ err: error, path }, 'tRPC error');
    },
  }),
);

app.onError((err, c) => {
  logger.error({ err }, 'Unhandled error');
  Sentry.captureException(err);
  return c.json({ ok: false, error: 'internal_error' }, 500);
});

const port = env.API_PORT;
serve({ fetch: app.fetch, port });
logger.info({ port }, `@sab/api listening on http://localhost:${port}`);
