import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders children text', () => {
    render(<VisuallyHidden>Hidden label</VisuallyHidden>);
    expect(screen.getByText('Hidden label')).toBeTruthy();
  });

  it('has sr-only CSS class', () => {
    const { container } = render(<VisuallyHidden>Text</VisuallyHidden>);
    expect(container.querySelector('.sr-only')).toBeTruthy();
  });

  it('wraps content in a span', () => {
    const { container } = render(<VisuallyHidden>Text</VisuallyHidden>);
    expect(container.querySelector('span.sr-only')).toBeTruthy();
  });
});
