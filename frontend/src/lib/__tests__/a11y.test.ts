import { describe, expect, it, beforeEach } from 'vitest';
import {
  generateId,
  resetIdCounter,
  getAriaLive,
  getAriaRole,
  isKeyMatch,
  externalLinkLabel,
  formatForScreenReader,
} from '../a11y';

describe('generateId', () => {
  beforeEach(() => resetIdCounter());

  it('generates sequential IDs with default prefix', () => {
    expect(generateId()).toBe('bf-1');
    expect(generateId()).toBe('bf-2');
  });

  it('supports custom prefix', () => {
    expect(generateId('dialog')).toBe('dialog-1');
  });
});

describe('getAriaLive', () => {
  it('returns assertive for error', () => {
    expect(getAriaLive('error')).toBe('assertive');
  });

  it('returns polite for info', () => {
    expect(getAriaLive('info')).toBe('polite');
  });

  it('returns polite for success', () => {
    expect(getAriaLive('success')).toBe('polite');
  });

  it('returns polite for warning', () => {
    expect(getAriaLive('warning')).toBe('polite');
  });
});

describe('getAriaRole', () => {
  it('returns alert for error', () => {
    expect(getAriaRole('error')).toBe('alert');
  });

  it('returns status for non-error types', () => {
    expect(getAriaRole('info')).toBe('status');
    expect(getAriaRole('success')).toBe('status');
    expect(getAriaRole('warning')).toBe('status');
  });
});

describe('isKeyMatch', () => {
  it('matches simple key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    expect(isKeyMatch(event, 'Escape')).toBe(true);
  });

  it('rejects wrong key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    expect(isKeyMatch(event, 'Escape')).toBe(false);
  });

  it('matches key with ctrl modifier', () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    expect(isKeyMatch(event, 'k', { ctrl: true })).toBe(true);
  });

  it('rejects key when ctrl modifier missing', () => {
    const event = new KeyboardEvent('keydown', { key: 'k' });
    expect(isKeyMatch(event, 'k', { ctrl: true })).toBe(false);
  });

  it('matches key with shift modifier', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    expect(isKeyMatch(event, 'Tab', { shift: true })).toBe(true);
  });
});

describe('externalLinkLabel', () => {
  it('appends new tab indicator', () => {
    expect(externalLinkLabel('View contract')).toBe('View contract (opens in new tab)');
  });
});

describe('formatForScreenReader', () => {
  it('formats number with unit', () => {
    expect(formatForScreenReader(1000, 'STX')).toBe('1,000 STX');
  });

  it('formats zero', () => {
    expect(formatForScreenReader(0, 'sBTC')).toBe('0 sBTC');
  });
});
