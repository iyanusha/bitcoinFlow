import { describe, expect, it, vi, beforeEach } from 'vitest';
import { copyToClipboard, isClipboardAvailable } from '../clipboard';

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('uses navigator.clipboard when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const result = await copyToClipboard('test text');
    expect(writeText).toHaveBeenCalledWith('test text');
    expect(result).toBe(true);
  });

  it('returns false when clipboard API fails and fallback fails', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('denied')),
      },
    });

    // Mock document.execCommand to fail
    vi.spyOn(document, 'execCommand').mockImplementation(() => {
      throw new Error('not supported');
    });

    const result = await copyToClipboard('test');
    expect(result).toBe(false);
  });
});

describe('isClipboardAvailable', () => {
  it('returns true when navigator.clipboard.writeText exists', () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn() },
    });
    expect(isClipboardAvailable()).toBe(true);
  });
});
