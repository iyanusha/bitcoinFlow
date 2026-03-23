import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';
import type { TransactionRecord } from '../../types';

describe('TransactionHistory', () => {
  const mockTransactions: TransactionRecord[] = [
    {
      txId: '0xabc123def456',
      type: 'deposit',
      amount: 50_000_000,
      status: 'confirmed',
      timestamp: Date.now() - 60000,
    },
    {
      txId: '0xdef789abc012',
      type: 'withdraw',
      amount: 25_000_000,
      status: 'pending',
      timestamp: Date.now() - 120000,
    },
  ];

  it('shows empty message when no transactions', () => {
    render(<TransactionHistory transactions={[]} onClear={() => {}} />);
    expect(screen.getByText(/No transactions yet/)).toBeTruthy();
  });

  it('renders transaction list', () => {
    render(<TransactionHistory transactions={mockTransactions} onClear={() => {}} />);
    expect(screen.getByText('Deposit')).toBeTruthy();
    expect(screen.getByText('Withdraw')).toBeTruthy();
  });

  it('shows transaction count', () => {
    render(<TransactionHistory transactions={mockTransactions} onClear={() => {}} />);
    expect(screen.getByText('(2)')).toBeTruthy();
  });

  it('shows status badges', () => {
    render(<TransactionHistory transactions={mockTransactions} onClear={() => {}} />);
    expect(screen.getByText('Confirmed')).toBeTruthy();
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('shows explorer links for each transaction', () => {
    render(<TransactionHistory transactions={mockTransactions} onClear={() => {}} />);
    const links = screen.getAllByText('View');
    expect(links).toHaveLength(2);
  });

  it('has tx-history CSS class', () => {
    const { container } = render(
      <TransactionHistory transactions={mockTransactions} onClear={() => {}} />
    );
    expect(container.querySelector('.tx-history')).toBeTruthy();
  });

  it('renders Clear button', () => {
    render(<TransactionHistory transactions={mockTransactions} onClear={() => {}} />);
    expect(screen.getByText('Clear')).toBeTruthy();
  });
});
