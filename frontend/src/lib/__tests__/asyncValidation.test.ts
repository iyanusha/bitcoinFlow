import { describe, expect, it, vi } from 'vitest';
import { validateAsync, createAsyncValidator, debounceAsyncValidator } from '../asyncValidation';

describe('validateAsync', () => {
  it('returns valid when async check passes', async () => {
    const result = await validateAsync('test', async () => true, 'Failed');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('returns error when async check fails', async () => {
    const result = await validateAsync('test', async () => false, 'Not available');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Not available');
  });

  it('returns generic error when async check throws', async () => {
    const result = await validateAsync('test', async () => { throw new Error('Network error'); }, 'Unused');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('try again');
  });
});

describe('createAsyncValidator', () => {
  it('runs sync validation first', async () => {
    const sync = (v: string) => v.length > 0
      ? { isValid: true, error: null }
      : { isValid: false, error: 'Required' };
    const asyncCheck = vi.fn(async () => true);
    const validator = createAsyncValidator(sync, asyncCheck, 'Async fail');

    const result = await validator('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Required');
    expect(asyncCheck).not.toHaveBeenCalled();
  });

  it('runs async check when sync passes', async () => {
    const sync = () => ({ isValid: true, error: null });
    const asyncCheck = vi.fn(async () => false);
    const validator = createAsyncValidator(sync, asyncCheck, 'Taken');

    const result = await validator('test');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Taken');
    expect(asyncCheck).toHaveBeenCalledWith('test');
  });
});

describe('debounceAsyncValidator', () => {
  it('debounces calls', async () => {
    vi.useFakeTimers();
    const inner = vi.fn(async (v: string) => ({ isValid: v === 'ok', error: v === 'ok' ? null : 'fail' }));
    const debounced = debounceAsyncValidator(inner, 100);

    const promise = debounced('ok');
    vi.advanceTimersByTime(100);
    const result = await promise;

    expect(result.isValid).toBe(true);
    expect(inner).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
