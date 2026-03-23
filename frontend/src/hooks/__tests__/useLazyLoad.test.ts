import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLazyLoad } from '../useLazyLoad';

describe('useLazyLoad', () => {
  let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;

  beforeEach(() => {
    const MockObserver = vi.fn((callback: (entries: Partial<IntersectionObserverEntry>[]) => void) => {
      observerCallback = callback;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', MockObserver);
  });

  it('starts with isVisible false', () => {
    const { result } = renderHook(() => useLazyLoad());
    expect(result.current.isVisible).toBe(false);
    expect(result.current.hasLoaded).toBe(false);
  });

  it('provides a ref callback', () => {
    const { result } = renderHook(() => useLazyLoad());
    expect(typeof result.current.ref).toBe('function');
  });

  it('sets isVisible when element enters viewport', () => {
    const { result } = renderHook(() => useLazyLoad());
    const div = document.createElement('div');
    act(() => result.current.ref(div));
    act(() => observerCallback([{ isIntersecting: true }]));
    expect(result.current.isVisible).toBe(true);
    expect(result.current.hasLoaded).toBe(true);
  });

  it('cleans up observer on unmount', () => {
    const { result, unmount } = renderHook(() => useLazyLoad());
    const div = document.createElement('div');
    act(() => result.current.ref(div));
    unmount();
    // No error means cleanup worked
  });
});
