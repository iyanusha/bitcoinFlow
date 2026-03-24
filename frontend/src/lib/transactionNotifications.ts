import type { TransactionStatus } from '../types';
import { logger } from './logger';

const STATUS_MESSAGES: Record<TransactionStatus, string> = {
  pending: 'Transaction submitted',
  confirmed: 'Transaction confirmed',
  failed: 'Transaction failed',
};

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  try {
    const result = await Notification.requestPermission();
    return result === 'granted';
  } catch {
    logger.warn('Failed to request notification permission');
    return false;
  }
}

export function hasNotificationPermission(): boolean {
  if (!isNotificationSupported()) return false;
  return Notification.permission === 'granted';
}

export function showTransactionNotification(
  txId: string,
  status: TransactionStatus,
  type: 'deposit' | 'withdraw'
): void {
  if (!hasNotificationPermission()) return;

  const title = STATUS_MESSAGES[status];
  const typeLabel = type === 'deposit' ? 'Deposit' : 'Withdrawal';
  const shortId = txId.slice(0, 10) + '...' + txId.slice(-6);

  try {
    new Notification(title, {
      body: `${typeLabel} ${shortId}`,
      tag: txId,
      silent: status === 'pending',
    });
  } catch {
    logger.warn('Failed to show notification');
  }
}
