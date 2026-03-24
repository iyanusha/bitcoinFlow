import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAnnouncer } from '../useAnnouncer';

describe('useAnnouncer', () => {
  afterEach(() => {
    // Clean up any live regions left in the DOM
    document.querySelectorAll('[aria-live]').forEach(el => el.remove());
    vi.restoreAllMocks();
  });

  it('creates a live region in the document', () => {
    renderHook(() => useAnnouncer());
    const region = document.querySelector('[aria-live]');
    expect(region).toBeTruthy();
  });

  it('removes live region on unmount', () => {
    const { unmount } = renderHook(() => useAnnouncer());
    unmount();
    const region = document.querySelector('[aria-live="polite"]');
    expect(region).toBeNull();
  });

  it('announces a message', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
    const { result } = renderHook(() => useAnnouncer());
    act(() => {
      result.current.announce('Test message');
    });
    const region = document.querySelector('[aria-live]');
    expect(region?.textContent).toBe('Test message');
  });

  it('supports assertive priority', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
    const { result } = renderHook(() => useAnnouncer());
    act(() => {
      result.current.announce('Urgent!', 'assertive');
    });
    const region = document.querySelector('[aria-live="assertive"]');
    expect(region).toBeTruthy();
  });

  it('live region is visually hidden', () => {
    renderHook(() => useAnnouncer());
    const region = document.querySelector('[aria-live]') as HTMLElement;
    expect(region?.style.position).toBe('absolute');
    expect(region?.style.width).toBe('1px');
    expect(region?.style.height).toBe('1px');
  });
});
