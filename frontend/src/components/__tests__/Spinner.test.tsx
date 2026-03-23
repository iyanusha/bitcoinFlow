import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('has default "Loading" aria-label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });

  it('accepts custom label', () => {
    render(<Spinner label="Fetching data" />);
    expect(screen.getByLabelText('Fetching data')).toBeTruthy();
  });

  it('has spinner CSS class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.spinner')).toBeTruthy();
  });

  it('applies inline size styles for sm', () => {
    const { container } = render(<Spinner size="sm" />);
    const el = container.querySelector('.spinner') as HTMLElement;
    expect(el.style.width).toBe('16px');
    expect(el.style.height).toBe('16px');
  });

  it('applies inline size styles for lg', () => {
    const { container } = render(<Spinner size="lg" />);
    const el = container.querySelector('.spinner') as HTMLElement;
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });
});
