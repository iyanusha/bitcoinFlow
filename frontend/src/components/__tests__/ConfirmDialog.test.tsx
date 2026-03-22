import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '../ConfirmDialog';

// Mock HTMLDialogElement.showModal since jsdom doesn't support it
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Delete?',
    message: 'Are you sure?',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it('renders title and message when open', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Delete?')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('renders default button labels', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Confirm')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('accepts custom button labels', () => {
    render(
      <ConfirmDialog {...defaultProps} confirmLabel="Yes, delete" cancelLabel="No, keep" />
    );
    expect(screen.getByText('Yes, delete')).toBeTruthy();
    expect(screen.getByText('No, keep')).toBeTruthy();
  });

  it('calls onConfirm when confirm button clicked', () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('calls onCancel when cancel button clicked', () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('returns null when not open', () => {
    const { container } = render(<ConfirmDialog {...defaultProps} open={false} />);
    expect(container.querySelector('.confirm-dialog')).toBeNull();
  });
});
