import 'node:process';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { pino } from 'pino';

/**
 * @sab/recognition — wraps the Claude Sonnet 4.6 multimodal endpoint for
 * UC-2 (beer-label recognition). Phase 0 ships a health check only; the
 * inference handler lands in Phase 2 once the beer catalog is seeded and
 * we can reconcile candidates against known beers.
 *
 * Why it's a separate service: we want to be able to swap the underlying
 * model (or add a fine-tuned classifier later) without touching the mobile
 * client or the API gateway.
 */

const logger = pino({ base: { service: 'recognition' } });
const app = new Hono();

app.get('/healthz', (c) => c.json({ ok: true, service: 'recognition' }));

const port = Number(process.env.RECOGNITION_PORT ?? 4010);
serve({ fetch: app.fetch, port });
logger.info({ port }, `@sab/recognition listening on http://localhost:${port}`);
