import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFocusReturn } from '../useFocusReturn';

describe('useFocusReturn', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
  });

  it('saves focus when isOpen becomes true', () => {
    const { rerender } = renderHook(
      ({ isOpen }) => useFocusReturn(isOpen),
      { initialProps: { isOpen: false } }
    );
    rerender({ isOpen: true });
    // Focus should be captured internally
    expect(document.activeElement).toBe(button);
  });

  it('does not throw when no element was focused', () => {
    (document.activeElement as HTMLElement)?.blur?.();
    expect(() => {
      const { rerender } = renderHook(
        ({ isOpen }) => useFocusReturn(isOpen),
        { initialProps: { isOpen: false } }
      );
      rerender({ isOpen: true });
      rerender({ isOpen: false });
    }).not.toThrow();
  });

  it('calls focus on previous element when closing', async () => {
    const focusSpy = vi.spyOn(button, 'focus');
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });

    const { rerender } = renderHook(
      ({ isOpen }) => useFocusReturn(isOpen),
      { initialProps: { isOpen: false } }
    );

    rerender({ isOpen: true });
    rerender({ isOpen: false });

    expect(focusSpy).toHaveBeenCalled();
    rafSpy.mockRestore();
    document.body.removeChild(button);
  });

  it('does not restore focus if still open', () => {
    const focusSpy = vi.spyOn(button, 'focus');
    focusSpy.mockClear();

    const { rerender } = renderHook(
      ({ isOpen }) => useFocusReturn(isOpen),
      { initialProps: { isOpen: false } }
    );

    rerender({ isOpen: true });
    // Still open, should not restore
    expect(focusSpy).not.toHaveBeenCalled();
    document.body.removeChild(button);
  });
});
