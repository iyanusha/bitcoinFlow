import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ValidatedInput } from '../ValidatedInput';
import { validateAmount } from '../../lib/validation';

describe('ValidatedInput', () => {
  it('renders input with placeholder', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} placeholder="0.00" />);
    expect(screen.getByPlaceholderText('0.00')).toBeDefined();
  });

  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(<ValidatedInput value="" onChange={onChange} id="test" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith('42');
  });

  it('shows error on blur with invalid value', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} validator={validateAmount} id="amt" />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.getByText('Amount is required')).toBeDefined();
  });

  it('does not show error before blur', () => {
    const { container } = render(<ValidatedInput value="" onChange={vi.fn()} validator={validateAmount} />);
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('marks input as aria-invalid on error', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} validator={validateAmount} id="amt" />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe('true');
  });

  it('renders label when provided', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} id="amt" label="Amount" />);
    expect(screen.getByText('Amount')).toBeDefined();
    expect(screen.getByLabelText('Amount')).toBeDefined();
  });

  it('renders help text when provided', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} id="amt" helpText="Min 0.0001" />);
    expect(screen.getByText('Min 0.0001')).toBeDefined();
  });

  it('applies input-error class on validation failure', () => {
    render(<ValidatedInput value="" onChange={vi.fn()} validator={validateAmount} id="amt" />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox').className).toContain('input-error');
  });

  it('applies input-valid class on validation success', () => {
    render(<ValidatedInput value="5" onChange={vi.fn()} validator={validateAmount} id="amt" />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox').className).toContain('input-valid');
  });
});
