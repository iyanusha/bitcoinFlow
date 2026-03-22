import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionDashboard } from '../TransactionDashboard';

vi.mock('../../hooks/useTransactionHistory', () => ({
  useTransactionHistory: () => ({
    transactions: [],
    addTransaction: vi.fn(),
    updateStatus: vi.fn(),
    clearHistory: vi.fn(),
    pendingCount: 0,
    hasPending: false,
  }),
}));

vi.mock('../../hooks/useTransactionStatus', () => ({
  useTransactionStatus: () => ({
    checkStatus: vi.fn(),
  }),
}));

vi.mock('../../hooks/useTransactionPoller', () => ({
  useTransactionPoller: vi.fn(),
}));

describe('TransactionDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders without crashing', () => {
    render(<TransactionDashboard />);
    expect(screen.getByText('Transaction History')).toBeDefined();
  });

  it('renders the dashboard container', () => {
    const { container } = render(<TransactionDashboard />);
    expect(container.querySelector('.tx-dashboard')).toBeTruthy();
  });

  it('renders the announcer region', () => {
    render(<TransactionDashboard />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('shows empty state when no transactions', () => {
    render(<TransactionDashboard />);
    expect(screen.getByText(/No transactions yet/)).toBeDefined();
  });
});
