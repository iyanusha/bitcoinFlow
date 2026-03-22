import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionSummary } from '../TransactionSummary';
import type { TransactionRecord } from '../../types';

const now = Date.now();

const mockTransactions: TransactionRecord[] = [
  { txId: '0x1', type: 'deposit', amount: 100_000_000, status: 'confirmed', timestamp: now - 60_000 },
  { txId: '0x2', type: 'deposit', amount: 50_000_000, status: 'confirmed', timestamp: now - 50_000 },
  { txId: '0x3', type: 'withdraw', amount: 30_000_000, status: 'confirmed', timestamp: now - 40_000 },
  { txId: '0x4', type: 'deposit', amount: 20_000_000, status: 'pending', timestamp: now - 10_000 },
  { txId: '0x5', type: 'withdraw', amount: 10_000_000, status: 'failed', timestamp: now - 5_000 },
];

describe('TransactionSummary', () => {
  it('renders nothing for empty transactions', () => {
    const { container } = render(<TransactionSummary transactions={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders total deposited amount', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByText('Total Deposited')).toBeDefined();
    expect(screen.getByText(/1\.5/)).toBeDefined();
  });

  it('renders total withdrawn amount', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByText('Total Withdrawn')).toBeDefined();
    expect(screen.getByText(/0\.3/)).toBeDefined();
  });

  it('renders net flow', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByText('Net Flow')).toBeDefined();
    expect(screen.getByText(/1\.2/)).toBeDefined();
  });

  it('renders deposit count', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByText('2 transactions')).toBeDefined();
  });

  it('shows pending count when pending transactions exist', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByText('Pending')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined();
  });

  it('hides pending section when no pending transactions', () => {
    const confirmed = mockTransactions.filter(tx => tx.status !== 'pending');
    render(<TransactionSummary transactions={confirmed} />);
    expect(screen.queryByText('Pending')).toBeNull();
  });

  it('has accessible region role', () => {
    render(<TransactionSummary transactions={mockTransactions} />);
    expect(screen.getByRole('region')).toBeDefined();
  });
});
