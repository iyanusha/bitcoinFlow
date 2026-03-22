import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccessibleIcon } from '../AccessibleIcon';

describe('AccessibleIcon', () => {
  it('renders with img role and aria-label', () => {
    render(<AccessibleIcon label="Warning">⚠</AccessibleIcon>);
    const icon = screen.getByRole('img');
    expect(icon.getAttribute('aria-label')).toBe('Warning');
  });

  it('renders decorative icon with aria-hidden', () => {
    render(<AccessibleIcon label="Star" decorative>★</AccessibleIcon>);
    const icon = screen.getByRole('presentation');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders children content', () => {
    render(<AccessibleIcon label="Check">✓</AccessibleIcon>);
    expect(screen.getByText('✓')).toBeDefined();
  });

  it('applies custom className', () => {
    render(<AccessibleIcon label="Info" className="icon-lg">ℹ</AccessibleIcon>);
    expect(screen.getByRole('img').className).toContain('icon-lg');
  });

  it('decorative icon does not have img role', () => {
    render(<AccessibleIcon label="Dot" decorative>●</AccessibleIcon>);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
