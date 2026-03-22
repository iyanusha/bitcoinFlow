import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LiveRegion } from '../LiveRegion';

describe('LiveRegion', () => {
  it('renders children', () => {
    render(<LiveRegion>Test message</LiveRegion>);
    expect(screen.getByText('Test message')).toBeDefined();
  });

  it('has status role', () => {
    render(<LiveRegion>Test</LiveRegion>);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('defaults to polite priority', () => {
    render(<LiveRegion>Test</LiveRegion>);
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
  });

  it('supports assertive priority', () => {
    render(<LiveRegion priority="assertive">Alert</LiveRegion>);
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('assertive');
  });

  it('defaults to atomic true', () => {
    render(<LiveRegion>Test</LiveRegion>);
    expect(screen.getByRole('status').getAttribute('aria-atomic')).toBe('true');
  });

  it('applies sr-only class by default', () => {
    render(<LiveRegion>Test</LiveRegion>);
    expect(screen.getByRole('status').className).toContain('sr-only');
  });

  it('accepts custom className', () => {
    render(<LiveRegion className="custom">Test</LiveRegion>);
    expect(screen.getByRole('status').className).toContain('custom');
  });
});
