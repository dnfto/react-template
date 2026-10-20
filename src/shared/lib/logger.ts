import { env } from '@/shared/config/env';

const levels = ['debug', 'info', 'warn', 'error'] as const;
type LogLevel = (typeof levels)[number];

function shouldLog(level: LogLevel) {
  return levels.indexOf(level) >= levels.indexOf(env.LOG_LEVEL);
}

export const logger = {
  debug: (message: string, context?: unknown) => {
    if (shouldLog('debug')) console.debug(message, context);
  },
  info: (message: string, context?: unknown) => {
    if (shouldLog('info')) console.info(message, context);
  },
  warn: (message: string, context?: unknown) => {
    if (shouldLog('warn')) console.warn(message, context);
  },
  error: (message: string, context?: unknown) => {
    if (shouldLog('error')) console.error(message, context);
  },
  performance: (name: string, measure: () => void) => {
    const start = window.performance.now();
    measure();
    const duration = window.performance.now() - start;
    if (shouldLog('debug')) console.debug(`[performance] ${name}: ${duration.toFixed(2)}ms`);
  },
} as const;
