import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { throttle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls function immediately on first invocation', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('suppresses subsequent calls within interval', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows call after interval has passed', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    vi.advanceTimersByTime(101);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('schedules trailing call when invoked during cooldown', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(); // immediate
    throttled(); // should schedule trailing
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes arguments to the throttled function', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled('a', 'b');
    expect(fn).toHaveBeenCalledWith('a', 'b');
  });
});
