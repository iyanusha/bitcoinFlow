import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToastContainer } from '../ToastContainer';
import type { ToastMessage } from '../../types';

describe('ToastContainer', () => {
  const mockToasts: ToastMessage[] = [
    { id: '1', type: 'success', message: 'First toast' },
    { id: '2', type: 'error', message: 'Second toast' },
  ];

  it('renders null when no toasts', () => {
    const { container } = render(<ToastContainer toasts={[]} onDismiss={() => {}} />);
    expect(container.querySelector('.toast-container')).toBeNull();
  });

  it('renders all toasts', () => {
    render(<ToastContainer toasts={mockToasts} onDismiss={() => {}} />);
    expect(screen.getByText('First toast')).toBeTruthy();
    expect(screen.getByText('Second toast')).toBeTruthy();
  });

  it('has aria-label for accessibility', () => {
    render(<ToastContainer toasts={mockToasts} onDismiss={() => {}} />);
    expect(screen.getByLabelText('Notifications')).toBeTruthy();
  });

  it('has toast-container CSS class', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} onDismiss={() => {}} />);
    expect(container.querySelector('.toast-container')).toBeTruthy();
  });

  it('passes onDismiss to each Toast', () => {
    const onDismiss = vi.fn();
    render(<ToastContainer toasts={mockToasts} onDismiss={onDismiss} />);
    // Each toast should have a dismiss button
    const buttons = screen.getAllByLabelText('Dismiss notification');
    expect(buttons).toHaveLength(2);
  });
});
