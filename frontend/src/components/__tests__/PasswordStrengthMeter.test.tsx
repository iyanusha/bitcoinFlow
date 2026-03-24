import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter';

describe('PasswordStrengthMeter', () => {
  it('renders nothing for empty password', () => {
    const { container } = render(<PasswordStrengthMeter password="" />);
    expect(container.innerHTML).toBe('');
  });

  it('shows weak for short password', () => {
    render(<PasswordStrengthMeter password="abc" />);
    expect(screen.getByText('weak')).toBeTruthy();
  });

  it('shows fair for medium password', () => {
    render(<PasswordStrengthMeter password="abcdefgh" />);
    expect(screen.getByText('fair')).toBeTruthy();
  });

  it('shows good for decent password', () => {
    render(<PasswordStrengthMeter password="Abcdefgh1" />);
    expect(screen.getByText('good')).toBeTruthy();
  });

  it('shows strong for complex password', () => {
    render(<PasswordStrengthMeter password="Abcdefgh123!@" />);
    expect(screen.getByText('strong')).toBeTruthy();
  });

  it('has role=meter with proper aria', () => {
    render(<PasswordStrengthMeter password="test" />);
    const meter = screen.getByRole('meter');
    expect(meter.getAttribute('aria-valuemin')).toBe('0');
    expect(meter.getAttribute('aria-valuemax')).toBe('4');
    expect(meter.getAttribute('aria-label')).toContain('Password strength');
  });

  it('renders 4 strength bars', () => {
    const { container } = render(<PasswordStrengthMeter password="test123" />);
    const bars = container.querySelectorAll('.password-strength-bar');
    expect(bars.length).toBe(4);
  });
});
