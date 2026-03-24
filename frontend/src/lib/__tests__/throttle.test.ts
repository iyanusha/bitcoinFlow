import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { throttle, rafThrottle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('calls function immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throttles subsequent calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls trailing after interval', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('cancel prevents pending calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('rafThrottle', () => {
  it('calls function on next frame', () => {
    const fn = vi.fn();
    const rafFn = vi.fn((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    vi.stubGlobal('requestAnimationFrame', rafFn);

    const throttled = rafThrottle(fn);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals();
  });

  it('cancel prevents pending frame', () => {
    const cancelFn = vi.fn();
    vi.stubGlobal('requestAnimationFrame', () => 42);
    vi.stubGlobal('cancelAnimationFrame', cancelFn);

    const throttled = rafThrottle(vi.fn());
    throttled();
    throttled.cancel();
    expect(cancelFn).toHaveBeenCalledWith(42);

    vi.unstubAllGlobals();
  });
});
