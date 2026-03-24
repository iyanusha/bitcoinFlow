import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormErrorMessage } from '../FormErrorMessage';

describe('FormErrorMessage', () => {
  it('renders nothing when error is null', () => {
    const { container } = render(<FormErrorMessage error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when error is undefined', () => {
    const { container } = render(<FormErrorMessage error={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders error message', () => {
    render(<FormErrorMessage error="Invalid amount" />);
    expect(screen.getByText('Invalid amount')).toBeDefined();
  });

  it('has alert role', () => {
    render(<FormErrorMessage error="Error" />);
    expect(screen.getByRole('alert')).toBeDefined();
  });

  it('has aria-live polite', () => {
    render(<FormErrorMessage error="Error" />);
    expect(screen.getByRole('alert').getAttribute('aria-live')).toBe('polite');
  });

  it('applies custom id', () => {
    render(<FormErrorMessage error="Error" id="deposit-error" />);
    expect(screen.getByRole('alert').id).toBe('deposit-error');
  });

  it('has form-error-message class', () => {
    render(<FormErrorMessage error="Error" />);
    expect(screen.getByRole('alert').className).toContain('form-error-message');
  });
});
