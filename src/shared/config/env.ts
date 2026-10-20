import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
  VITE_API_BASE_URL: z.string().url(),
  VITE_ENABLE_API_MOCKING: z.enum(['true', 'false']).default('false'),
  VITE_ENABLE_ROUTER_DEVTOOLS: z.enum(['true', 'false']).default('false'),
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsedEnv = envSchema.parse(import.meta.env);

export const env = {
  APP_NAME: parsedEnv.VITE_APP_NAME,
  API_BASE_URL: parsedEnv.VITE_API_BASE_URL,
  ENABLE_API_MOCKING: parsedEnv.VITE_ENABLE_API_MOCKING === 'true',
  ENABLE_ROUTER_DEVTOOLS: parsedEnv.VITE_ENABLE_ROUTER_DEVTOOLS === 'true',
  LOG_LEVEL: parsedEnv.VITE_LOG_LEVEL,
} as const;
