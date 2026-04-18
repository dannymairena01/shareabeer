import { z } from 'zod';

/**
 * Environment schema for @sab/api. Parsed once at boot; process exits if invalid.
 * Secrets (SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, …) are required at
 * runtime but treated as optional here so `pnpm typecheck` and CI can load
 * this module without the full vault being mounted.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(4000),
  API_PUBLIC_URL: z.string().url().default('http://localhost:4000'),
  DATABASE_URL: z.string().min(1).optional(),
  REDIS_URL: z.string().min(1).optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RECOGNITION_URL: z.string().url().default('http://localhost:4010'),
  SENTRY_DSN_API: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration for @sab/api.');
  }
  return parsed.data;
}
