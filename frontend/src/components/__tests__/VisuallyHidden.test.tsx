import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders children', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText('Hidden text')).toBeDefined();
  });

  it('applies sr-only class', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>);
    expect(screen.getByText('Hidden').className).toContain('sr-only');
  });

  it('renders as span by default', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>);
    expect(screen.getByText('Hidden').tagName).toBe('SPAN');
  });

  it('renders as custom element', () => {
    render(<VisuallyHidden as="div">Hidden</VisuallyHidden>);
    expect(screen.getByText('Hidden').tagName).toBe('DIV');
  });

  it('renders as h2 element', () => {
    render(<VisuallyHidden as="h2">Section Title</VisuallyHidden>);
    const el = screen.getByText('Section Title');
    expect(el.tagName).toBe('H2');
    expect(el.className).toContain('sr-only');
  });
});
