import { describe, expect, it, vi, beforeEach } from 'vitest';
import { isNotificationSupported, hasNotificationPermission } from '../transactionNotifications';

describe('transactionNotifications', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('isNotificationSupported', () => {
    it('returns true when Notification API is available', () => {
      vi.stubGlobal('Notification', { permission: 'default', requestPermission: vi.fn() });
      expect(isNotificationSupported()).toBe(true);
      vi.unstubAllGlobals();
    });
  });

  describe('hasNotificationPermission', () => {
    it('returns true when permission is granted', () => {
      vi.stubGlobal('Notification', { permission: 'granted' });
      expect(hasNotificationPermission()).toBe(true);
      vi.unstubAllGlobals();
    });

    it('returns false when permission is denied', () => {
      vi.stubGlobal('Notification', { permission: 'denied' });
      expect(hasNotificationPermission()).toBe(false);
      vi.unstubAllGlobals();
    });

    it('returns false when permission is default', () => {
      vi.stubGlobal('Notification', { permission: 'default' });
      expect(hasNotificationPermission()).toBe(false);
      vi.unstubAllGlobals();
    });
  });
});
