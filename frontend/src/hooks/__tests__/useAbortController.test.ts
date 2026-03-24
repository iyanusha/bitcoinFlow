import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAbortController } from '../useAbortController';

describe('useAbortController', () => {
  it('provides a signal', () => {
    const { result } = renderHook(() => useAbortController());
    const signal = result.current.getSignal();
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(signal.aborted).toBe(false);
  });

  it('aborts the signal manually', () => {
    const { result } = renderHook(() => useAbortController());
    const signal = result.current.getSignal();
    act(() => result.current.abort());
    expect(signal.aborted).toBe(true);
  });

  it('provides fresh signal after abort', () => {
    const { result } = renderHook(() => useAbortController());
    act(() => result.current.abort());
    const freshSignal = result.current.getSignal();
    expect(freshSignal.aborted).toBe(false);
  });

  it('auto-aborts on unmount', () => {
    const { result, unmount } = renderHook(() => useAbortController());
    const signal = result.current.getSignal();
    unmount();
    expect(signal.aborted).toBe(true);
  });
});
