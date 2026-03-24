import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from '../useUpdateEffect';

describe('useUpdateEffect', () => {
  it('does not fire on initial render', () => {
    const effect = vi.fn();
    renderHook(() => useUpdateEffect(effect, []));
    expect(effect).not.toHaveBeenCalled();
  });

  it('fires on subsequent renders when deps change', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } },
    );
    expect(effect).not.toHaveBeenCalled();
    rerender({ value: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('does not fire when deps stay the same', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } },
    );
    rerender({ value: 1 });
    // Called once because isFirstRender is set to false after first render
    // but deps didn't change so it won't fire
    // Actually it will fire because React re-renders the hook entirely
    // Let's just check it doesn't fire on first render
    expect(effect).toHaveBeenCalledTimes(0);
  });

  it('calls cleanup function', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);
    const { rerender, unmount } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } },
    );
    rerender({ value: 2 });
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
