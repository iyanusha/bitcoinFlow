import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders message text', () => {
    render(<ErrorMessage message="Something failed" />);
    expect(screen.getByText('Something failed')).toBeTruthy();
  });

  it('has role="alert" for error type', () => {
    const { container } = render(<ErrorMessage message="Error" type="error" />);
    expect(container.querySelector('[role="alert"]')).toBeTruthy();
  });

  it('has role="status" for info type', () => {
    const { container } = render(<ErrorMessage message="Info" type="info" />);
    expect(container.querySelector('[role="status"]')).toBeTruthy();
  });

  it('shows dismiss button when onDismiss provided', () => {
    const onDismiss = vi.fn();
    render(<ErrorMessage message="Error" onDismiss={onDismiss} />);
    expect(screen.getByLabelText('Dismiss message')).toBeTruthy();
  });

  it('calls onDismiss when dismiss button clicked', () => {
    const onDismiss = vi.fn();
    render(<ErrorMessage message="Error" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss message'));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('hides dismiss button when onDismiss not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByLabelText('Dismiss message')).toBeNull();
  });

  it('uses assertive aria-live for errors', () => {
    const { container } = render(<ErrorMessage message="Error" type="error" />);
    expect(container.querySelector('[aria-live="assertive"]')).toBeTruthy();
  });

  it('uses polite aria-live for warnings', () => {
    const { container } = render(<ErrorMessage message="Warning" type="warning" />);
    expect(container.querySelector('[aria-live="polite"]')).toBeTruthy();
  });
});
