import { describe, expect, it } from 'vitest';
import { ARIA_DESCRIPTIONS, LANDMARK_LABELS, KEYS, isActivationKey, getAriaLive, getAriaRole, externalLinkLabel } from '../a11y';
import { contrastRatio, meetsAA, getContrastLevel } from '../colorContrast';

describe('a11y integration', () => {
  describe('ARIA_DESCRIPTIONS completeness', () => {
    it('covers all main UI sections', () => {
      const requiredSections = ['vaultStats', 'userPosition', 'depositForm', 'withdrawForm', 'transactionHistory', 'walletConnection'];
      requiredSections.forEach(section => {
        expect(ARIA_DESCRIPTIONS[section as keyof typeof ARIA_DESCRIPTIONS]).toBeTruthy();
      });
    });

    it('descriptions are non-empty strings', () => {
      Object.values(ARIA_DESCRIPTIONS).forEach(desc => {
        expect(typeof desc).toBe('string');
        expect(desc.length).toBeGreaterThan(10);
      });
    });
  });

  describe('LANDMARK_LABELS completeness', () => {
    it('covers required landmarks', () => {
      expect(LANDMARK_LABELS.header).toBeTruthy();
      expect(LANDMARK_LABELS.main).toBeTruthy();
      expect(LANDMARK_LABELS.footer).toBeTruthy();
    });
  });

  describe('KEYS completeness', () => {
    it('includes navigation keys', () => {
      expect(KEYS.ARROW_UP).toBe('ArrowUp');
      expect(KEYS.ARROW_DOWN).toBe('ArrowDown');
      expect(KEYS.ARROW_LEFT).toBe('ArrowLeft');
      expect(KEYS.ARROW_RIGHT).toBe('ArrowRight');
      expect(KEYS.HOME).toBe('Home');
      expect(KEYS.END).toBe('End');
    });

    it('includes action keys', () => {
      expect(KEYS.ENTER).toBe('Enter');
      expect(KEYS.SPACE).toBe(' ');
      expect(KEYS.ESCAPE).toBe('Escape');
      expect(KEYS.TAB).toBe('Tab');
    });
  });

  describe('utility function consistency', () => {
    it('activation keys match KEYS constants', () => {
      expect(isActivationKey(KEYS.ENTER)).toBe(true);
      expect(isActivationKey(KEYS.SPACE)).toBe(true);
      expect(isActivationKey(KEYS.ESCAPE)).toBe(false);
    });

    it('error type gets assertive/alert treatment', () => {
      expect(getAriaLive('error')).toBe('assertive');
      expect(getAriaRole('error')).toBe('alert');
    });

    it('non-error types get polite/status treatment', () => {
      (['info', 'success', 'warning'] as const).forEach(type => {
        expect(getAriaLive(type)).toBe('polite');
        expect(getAriaRole(type)).toBe('status');
      });
    });

    it('external link labels include new tab indicator', () => {
      const label = externalLinkLabel('Stacks');
      expect(label).toContain('opens in new tab');
      expect(label).toContain('Stacks');
    });
  });

  describe('theme color contrast compliance', () => {
    it('light mode text on background meets AA', () => {
      expect(meetsAA('#333333', '#ffffff')).toBe(true);
    });

    it('light mode accent on background meets AA for large text', () => {
      expect(meetsAA('#667eea', '#ffffff', true)).toBe(true);
    });

    it('dark mode text on background meets AA', () => {
      expect(meetsAA('#f1f5f9', '#0f172a')).toBe(true);
    });

    it('dark mode accent on background meets AA for large text', () => {
      expect(meetsAA('#818cf8', '#0f172a', true)).toBe(true);
    });

    it('error colors have adequate contrast', () => {
      expect(contrastRatio('#dc2626', '#fee2e2')).toBeGreaterThan(3);
    });

    it('success colors have adequate contrast', () => {
      expect(contrastRatio('#16a34a', '#d1fae5')).toBeGreaterThan(3);
    });
  });

  describe('contrast level classification', () => {
    it('black on white is AAA', () => {
      expect(getContrastLevel('#000', '#fff')).toBe('AAA');
    });

    it('primary text on card is AA or better', () => {
      const level = getContrastLevel('#333333', '#ffffff');
      expect(['AA', 'AAA']).toContain(level);
    });
  });
});
