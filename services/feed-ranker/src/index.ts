import 'node:process';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { pino } from 'pino';

/**
 * @sab/feed-ranker — computes the For You ranking (UC-8). Phase 0 ships
 * a health check only; the ranker lands in Phase 3 as reverse-chron +
 * affinity, and is upgraded to ML-ranked in Phase 7.
 */
const logger = pino({ base: { service: 'feed-ranker' } });
const app = new Hono();

app.get('/healthz', (c) => c.json({ ok: true, service: 'feed-ranker' }));

const port = Number(process.env.FEED_RANKER_PORT ?? 4020);
serve({ fetch: app.fetch, port });
logger.info({ port }, `@sab/feed-ranker listening on http://localhost:${port}`);
