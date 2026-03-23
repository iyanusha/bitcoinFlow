import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ValidatedInput } from '../ValidatedInput';
import type { ValidationResult } from '../../lib/validation';

describe('ValidatedInput', () => {
  it('renders with placeholder', () => {
    render(<ValidatedInput value="" onChange={() => {}} placeholder="Enter amount" />);
    expect(screen.getByPlaceholderText('Enter amount')).toBeTruthy();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<ValidatedInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '100' } });
    expect(onChange).toHaveBeenCalledWith('100');
  });

  it('shows error after blur with failing validator', () => {
    const validator = (v: string): ValidationResult => ({
      isValid: false,
      error: 'Invalid value',
    });
    render(<ValidatedInput value="" onChange={() => {}} validator={validator} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByText('Invalid value')).toBeTruthy();
  });

  it('does not show error before blur', () => {
    const validator = (v: string): ValidationResult => ({
      isValid: false,
      error: 'Invalid',
    });
    render(<ValidatedInput value="" onChange={() => {}} validator={validator} />);
    expect(screen.queryByText('Invalid')).toBeNull();
  });

  it('sets aria-invalid when touched and error', () => {
    const validator = (): ValidationResult => ({ isValid: false, error: 'Err' });
    render(<ValidatedInput value="" onChange={() => {}} validator={validator} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe('true');
  });

  it('adds valid class when touched and no error', () => {
    const validator = (): ValidationResult => ({ isValid: true, error: null });
    const { container } = render(<ValidatedInput value="1" onChange={() => {}} validator={validator} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(container.querySelector('.valid')).toBeTruthy();
  });

  it('is disabled when disabled prop set', () => {
    render(<ValidatedInput value="" onChange={() => {}} disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
