import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFormDirtyWarning } from '../useFormDirtyWarning';

describe('useFormDirtyWarning', () => {
  const addSpy = vi.spyOn(window, 'addEventListener');
  const removeSpy = vi.spyOn(window, 'removeEventListener');

  afterEach(() => {
    addSpy.mockClear();
    removeSpy.mockClear();
  });

  it('does not add listener when not dirty', () => {
    renderHook(() => useFormDirtyWarning(false));
    const beforeUnloadCalls = addSpy.mock.calls.filter(
      (c) => c[0] === 'beforeunload',
    );
    expect(beforeUnloadCalls.length).toBe(0);
  });

  it('adds beforeunload listener when dirty', () => {
    renderHook(() => useFormDirtyWarning(true));
    const beforeUnloadCalls = addSpy.mock.calls.filter(
      (c) => c[0] === 'beforeunload',
    );
    expect(beforeUnloadCalls.length).toBe(1);
  });

  it('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useFormDirtyWarning(true));
    unmount();
    const removeCalls = removeSpy.mock.calls.filter(
      (c) => c[0] === 'beforeunload',
    );
    expect(removeCalls.length).toBe(1);
  });

  it('removes listener when dirty becomes false', () => {
    const { rerender } = renderHook(
      ({ isDirty }) => useFormDirtyWarning(isDirty),
      { initialProps: { isDirty: true } },
    );
    rerender({ isDirty: false });
    const removeCalls = removeSpy.mock.calls.filter(
      (c) => c[0] === 'beforeunload',
    );
    expect(removeCalls.length).toBe(1);
  });
});
