import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionAnnouncer } from '../TransactionAnnouncer';
import type { TransactionRecord } from '../../types';

const mockTx: TransactionRecord = {
  txId: '0x1234',
  type: 'deposit',
  amount: 100,
  status: 'pending',
  timestamp: Date.now(),
};

describe('TransactionAnnouncer', () => {
  it('renders an aria-live region', () => {
    render(<TransactionAnnouncer transactions={[]} />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('uses polite live region', () => {
    render(<TransactionAnnouncer transactions={[]} />);
    const el = screen.getByRole('status');
    expect(el.getAttribute('aria-live')).toBe('polite');
  });

  it('is visually hidden', () => {
    render(<TransactionAnnouncer transactions={[]} />);
    const el = screen.getByRole('status');
    expect(el.className).toContain('sr-only');
  });

  it('renders with transactions without crashing', () => {
    render(<TransactionAnnouncer transactions={[mockTx]} />);
    expect(screen.getByRole('status')).toBeDefined();
  });
});
