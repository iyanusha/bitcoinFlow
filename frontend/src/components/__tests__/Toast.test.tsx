import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '../Toast';
import type { ToastMessage } from '../../types';

describe('Toast', () => {
  const baseToast: ToastMessage = {
    id: 'toast-1',
    type: 'success',
    message: 'Deposit confirmed',
  };

  it('renders toast message', () => {
    render(<Toast toast={baseToast} onDismiss={() => {}} />);
    expect(screen.getByText('Deposit confirmed')).toBeTruthy();
  });

  it('applies type-specific CSS class', () => {
    const { container } = render(<Toast toast={baseToast} onDismiss={() => {}} />);
    expect(container.querySelector('.toast-success')).toBeTruthy();
  });

  it('calls onDismiss when dismiss button clicked', () => {
    const onDismiss = vi.fn();
    render(<Toast toast={baseToast} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('shows explorer link when txId is present', () => {
    const toastWithTx: ToastMessage = {
      ...baseToast,
      txId: '0xabc123',
    };
    render(<Toast toast={toastWithTx} onDismiss={() => {}} />);
    expect(screen.getByText('View TX')).toBeTruthy();
  });

  it('does not show explorer link without txId', () => {
    render(<Toast toast={baseToast} onDismiss={() => {}} />);
    expect(screen.queryByText('View TX')).toBeNull();
  });

  it('has role="status" for accessibility', () => {
    const { container } = render(<Toast toast={baseToast} onDismiss={() => {}} />);
    expect(container.querySelector('[role="status"]')).toBeTruthy();
  });
});
