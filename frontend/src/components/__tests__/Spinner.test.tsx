import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders with status role by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('has default Loading aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Loading');
  });

  it('accepts custom label', () => {
    render(<Spinner label="Processing" />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Processing');
  });

  it('renders as decorative with presentation role', () => {
    render(<Spinner decorative />);
    expect(screen.getByRole('presentation')).toBeDefined();
  });

  it('hides decorative spinner from screen readers', () => {
    render(<Spinner decorative />);
    expect(screen.getByRole('presentation').getAttribute('aria-hidden')).toBe('true');
  });

  it('applies spinner class', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').className).toContain('spinner');
  });
});
