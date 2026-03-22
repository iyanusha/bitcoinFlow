import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders with default target', () => {
    render(<SkipLink />);
    const link = screen.getByText('Skip to main content');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('accepts custom targetId', () => {
    render(<SkipLink targetId="dashboard" />);
    const link = screen.getByText('Skip to main content');
    expect(link.getAttribute('href')).toBe('#dashboard');
  });

  it('has skip-link CSS class', () => {
    const { container } = render(<SkipLink />);
    expect(container.querySelector('.skip-link')).toBeTruthy();
  });
});
