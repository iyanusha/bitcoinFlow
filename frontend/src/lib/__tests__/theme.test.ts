import { describe, expect, it, beforeEach, vi } from 'vitest';
import { getColorScheme, applyTheme, persistTheme } from '../theme';

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

describe('applyTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('adds dark class when isDark is true', () => {
    applyTheme(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when isDark is false', () => {
    document.documentElement.classList.add('dark');
    applyTheme(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('persistTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores "true" for dark mode', () => {
    persistTheme(true);
    expect(localStorage.getItem('bf-dark-mode')).toBe('true');
  });

  it('stores "false" for light mode', () => {
    persistTheme(false);
    expect(localStorage.getItem('bf-dark-mode')).toBe('false');
  });
});
