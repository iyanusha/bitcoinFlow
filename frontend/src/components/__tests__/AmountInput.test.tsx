import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AmountInput } from '../AmountInput';

describe('AmountInput', () => {
  it('renders label text', () => {
    render(<AmountInput value="" onChange={() => {}} label="Deposit" unit="sBTC" />);
    expect(screen.getByText('Deposit')).toBeTruthy();
  });

  it('renders unit suffix', () => {
    render(<AmountInput value="" onChange={() => {}} label="Amount" unit="FLOW" />);
    expect(screen.getByText('FLOW')).toBeTruthy();
  });

  it('calls onChange with sanitized value', () => {
    const onChange = vi.fn();
    render(<AmountInput value="" onChange={onChange} label="Amount" unit="STX" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12abc34' } });
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('shows MAX button when max is provided', () => {
    render(<AmountInput value="" onChange={() => {}} label="Amount" unit="STX" max={100} />);
    expect(screen.getByText('MAX')).toBeTruthy();
  });

  it('sets value to max when MAX clicked', () => {
    const onChange = vi.fn();
    render(<AmountInput value="" onChange={onChange} label="Amount" unit="STX" max={50} />);
    fireEvent.click(screen.getByText('MAX'));
    expect(onChange).toHaveBeenCalledWith('50');
  });

  it('does not show MAX button without max prop', () => {
    render(<AmountInput value="" onChange={() => {}} label="Amount" unit="STX" />);
    expect(screen.queryByText('MAX')).toBeNull();
  });

  it('shows error message when error provided', () => {
    render(<AmountInput value="" onChange={() => {}} label="Amount" unit="STX" error="Too low" />);
    expect(screen.getByText('Too low')).toBeTruthy();
  });

  it('is disabled when disabled prop set', () => {
    render(<AmountInput value="" onChange={() => {}} label="Amount" unit="STX" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
