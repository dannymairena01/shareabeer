import 'node:process';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { pino } from 'pino';

/**
 * @sab/achievements — event-driven evaluator for UC-19. Phase 0 ships a
 * health check only; Phase 5 subscribes to the `user_activity` stream,
 * evaluates deterministic rules (BR-18), and writes idempotent unlocks
 * into `user_achievements`.
 */
const logger = pino({ base: { service: 'achievements' } });
const app = new Hono();

app.get('/healthz', (c) => c.json({ ok: true, service: 'achievements' }));

const port = Number(process.env.ACHIEVEMENTS_PORT ?? 4030);
serve({ fetch: app.fetch, port });
logger.info({ port }, `@sab/achievements listening on http://localhost:${port}`);
