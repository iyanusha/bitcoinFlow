import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders with default label', () => {
    render(<SkipLink />);
    expect(screen.getByText('Skip to main content')).toBeDefined();
  });

  it('renders with custom label', () => {
    render(<SkipLink label="Skip to navigation" />);
    expect(screen.getByText('Skip to navigation')).toBeDefined();
  });

  it('links to default target id', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('#main-content');
  });

  it('links to custom target id', () => {
    render(<SkipLink targetId="nav" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('#nav');
  });

  it('has skip-link class', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link').className).toContain('skip-link');
  });

  it('focuses target element on click', () => {
    const target = document.createElement('main');
    target.id = 'main-content';
    document.body.appendChild(target);
    const focusSpy = vi.spyOn(target, 'focus');

    render(<SkipLink />);
    fireEvent.click(screen.getByRole('link'));

    expect(target.getAttribute('tabindex')).toBe('-1');
    expect(focusSpy).toHaveBeenCalled();
    document.body.removeChild(target);
  });

  it('has aria-label', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link').getAttribute('aria-label')).toBe('Skip to main content');
  });
});
