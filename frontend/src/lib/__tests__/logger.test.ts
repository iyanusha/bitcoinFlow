import { describe, expect, it, vi, beforeEach } from 'vitest';
import { logger } from '../logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('logger.info calls console.info', () => {
    logger.info('test message');
    expect(console.info).toHaveBeenCalled();
  });

  it('logger.warn calls console.warn', () => {
    logger.warn('warning message');
    expect(console.warn).toHaveBeenCalled();
  });

  it('logger.error calls console.error', () => {
    logger.error('error message');
    expect(console.error).toHaveBeenCalled();
  });

  it('logger.info includes prefix', () => {
    logger.info('test');
    const call = (console.info as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[0]).toContain('BitcoinFlow');
  });

  it('logger.info passes data argument', () => {
    logger.info('msg', { key: 'value' });
    const call = (console.info as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[2]).toEqual({ key: 'value' });
  });

  it('logger.debug calls console.log in dev mode', () => {
    logger.debug('debug info');
    expect(console.log).toHaveBeenCalled();
  });

  it('logger.error includes ERROR in prefix', () => {
    logger.error('critical');
    const call = (console.error as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[0]).toContain('ERROR');
  });

  it('logger.warn includes WARN in prefix', () => {
    logger.warn('caution');
    const call = (console.warn as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[0]).toContain('WARN');
  });

  it('logger passes empty string when no data is provided', () => {
    logger.info('no data');
    const call = (console.info as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[2]).toBe('');
  });
});
