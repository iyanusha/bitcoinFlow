import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FocusRing } from '../FocusRing';

describe('FocusRing', () => {
  it('renders children', () => {
    render(<FocusRing><button>Click me</button></FocusRing>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('has focus-ring-container class', () => {
    const { container } = render(<FocusRing>Content</FocusRing>);
    expect(container.firstElementChild?.className).toContain('focus-ring-container');
  });

  it('accepts custom className', () => {
    const { container } = render(<FocusRing className="custom">Content</FocusRing>);
    expect(container.firstElementChild?.className).toContain('custom');
    expect(container.firstElementChild?.className).toContain('focus-ring-container');
  });

  it('renders as a div element', () => {
    const { container } = render(<FocusRing>Content</FocusRing>);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });
});
