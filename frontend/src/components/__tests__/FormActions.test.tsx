import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormActions } from '../FormActions';

describe('FormActions', () => {
  it('renders submit button with default label', () => {
    render(<FormActions />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('renders custom submit label', () => {
    render(<FormActions submitLabel="Deposit" />);
    expect(screen.getByText('Deposit')).toBeTruthy();
  });

  it('calls onSubmit when submit clicked', () => {
    const onSubmit = vi.fn();
    render(<FormActions onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders reset button when showReset and onReset provided', () => {
    const onReset = vi.fn();
    render(<FormActions onReset={onReset} showReset={true} />);
    expect(screen.getByText('Reset')).toBeTruthy();
  });

  it('hides reset button when showReset is false', () => {
    render(<FormActions onReset={() => {}} showReset={false} />);
    expect(screen.queryByText('Reset')).toBeNull();
  });

  it('disables submit when isDisabled', () => {
    render(<FormActions isDisabled={true} />);
    expect(screen.getByText('Submit').hasAttribute('disabled')).toBe(true);
  });

  it('shows Processing when isSubmitting', () => {
    render(<FormActions isSubmitting={true} />);
    expect(screen.getByText('Processing...')).toBeTruthy();
  });

  it('sets aria-busy when submitting', () => {
    render(<FormActions isSubmitting={true} />);
    expect(screen.getByText('Processing...').getAttribute('aria-busy')).toBe('true');
  });
});
