import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyTransactions } from '../EmptyTransactions';

describe('EmptyTransactions', () => {
  it('renders default empty message', () => {
    render(<EmptyTransactions />);
    expect(screen.getByText(/No transactions yet/)).toBeDefined();
  });

  it('renders filtered empty message', () => {
    render(<EmptyTransactions filtered />);
    expect(screen.getByText(/No transactions match/)).toBeDefined();
  });

  it('has status role for accessibility', () => {
    render(<EmptyTransactions />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('shows search icon when filtered', () => {
    const { container } = render(<EmptyTransactions filtered />);
    expect(container.textContent).toContain('🔍');
  });

  it('shows clipboard icon when not filtered', () => {
    const { container } = render(<EmptyTransactions />);
    expect(container.textContent).toContain('📋');
  });
});
