import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardShortcut } from '../useKeyboardShortcut';

describe('useKeyboardShortcut', () => {
  let handler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handler = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls handler on matching key press', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k' }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not call handler for non-matching key', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k' }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'j' }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('respects ctrl modifier', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k', ctrl: true }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(handler).not.toHaveBeenCalled();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('respects shift modifier', () => {
    renderHook(() => useKeyboardShortcut({ key: '?', shift: true }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
    expect(handler).not.toHaveBeenCalled();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?', shiftKey: true }));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k', enabled: false }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('ignores events from input elements', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k' }, handler));
    const input = document.createElement('input');
    document.body.appendChild(input);
    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: input });
    document.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it('ignores events from textarea elements', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k' }, handler));
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: textarea });
    document.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(textarea);
  });

  it('prevents default when configured', () => {
    renderHook(() => useKeyboardShortcut({ key: '/', preventDefault: true }, handler));
    const event = new KeyboardEvent('keydown', { key: '/', cancelable: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(preventSpy).toHaveBeenCalled();
  });

  it('supports metaKey as ctrl equivalent', () => {
    renderHook(() => useKeyboardShortcut({ key: 'k', ctrl: true }, handler));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    expect(handler).toHaveBeenCalledOnce();
  });
});
