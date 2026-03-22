import { describe, expect, it, beforeEach, vi } from 'vitest';
import { getColorScheme } from '../theme';

describe('getColorScheme', () => {
  it('returns "dark" when isDark is true', () => {
    expect(getColorScheme(true)).toBe('dark');
  });

  it('returns "light" when isDark is false', () => {
    expect(getColorScheme(false)).toBe('light');
  });
});

describe('getStoredTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when nothing is stored and system prefers light', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    const { getStoredTheme } = await import('../theme');
    expect(getStoredTheme()).toBe(false);
  });

  it('returns true when stored value is "true"', async () => {
    localStorage.setItem('bf-dark-mode', 'true');
    const { getStoredTheme } = await import('../theme');
    expect(getStoredTheme()).toBe(true);
  });

  it('returns false when stored value is "false"', async () => {
    localStorage.setItem('bf-dark-mode', 'false');
    const { getStoredTheme } = await import('../theme');
    expect(getStoredTheme()).toBe(false);
  });
});
