import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionItem } from '../TransactionItem';
import type { TransactionRecord } from '../../types';

const mockTx: TransactionRecord = {
  txId: '0x1234567890abcdef',
  type: 'deposit',
  amount: 50_000_000,
  status: 'confirmed',
  timestamp: Date.now() - 60_000,
};

describe('TransactionItem', () => {
  it('renders transaction type', () => {
    render(<ul><TransactionItem transaction={mockTx} /></ul>);
    expect(screen.getByText('Deposit')).toBeDefined();
  });

  it('renders formatted amount', () => {
    render(<ul><TransactionItem transaction={mockTx} /></ul>);
    expect(screen.getByText(/0\.5/)).toBeDefined();
  });

  it('renders status badge', () => {
    render(<ul><TransactionItem transaction={mockTx} /></ul>);
    expect(screen.getByText('Confirmed')).toBeDefined();
  });

  it('renders explorer link', () => {
    render(<ul><TransactionItem transaction={mockTx} /></ul>);
    const link = screen.getByText('View');
    expect(link.getAttribute('href')).toContain(mockTx.txId);
  });

  it('renders withdrawal type', () => {
    const withdrawTx = { ...mockTx, type: 'withdraw' as const };
    render(<ul><TransactionItem transaction={withdrawTx} /></ul>);
    expect(screen.getByText('Withdraw')).toBeDefined();
  });

  it('renders pending status', () => {
    const pendingTx = { ...mockTx, status: 'pending' as const };
    render(<ul><TransactionItem transaction={pendingTx} /></ul>);
    expect(screen.getByText('Pending')).toBeDefined();
  });

  it('renders failed status', () => {
    const failedTx = { ...mockTx, status: 'failed' as const };
    render(<ul><TransactionItem transaction={failedTx} /></ul>);
    expect(screen.getByText('Failed')).toBeDefined();
  });
});
