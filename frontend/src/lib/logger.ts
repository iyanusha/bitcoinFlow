type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const isDev = import.meta.env.DEV;

/** Minimum log level — everything below this is suppressed */
const minLevel: LogLevel = isDev ? 'debug' : 'warn';

function log(level: LogLevel, message: string, data?: unknown) {
  if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[minLevel]) return;

  const timestamp = isDev ? new Date().toISOString().slice(11, 23) : '';
  const prefix = isDev
    ? `[${timestamp}][BitcoinFlow:${level.toUpperCase()}]`
    : `[BitcoinFlow:${level.toUpperCase()}]`;
  console[level === 'debug' ? 'log' : level](prefix, message, data ?? '');
}

export const logger = {
  debug: (msg: string, data?: unknown) => log('debug', msg, data),
  info: (msg: string, data?: unknown) => log('info', msg, data),
  warn: (msg: string, data?: unknown) => log('warn', msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
};
