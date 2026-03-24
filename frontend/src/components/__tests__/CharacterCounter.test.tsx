import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterCounter } from '../CharacterCounter';

describe('CharacterCounter', () => {
  it('renders current/max count', () => {
    render(<CharacterCounter current={5} max={100} />);
    expect(screen.getByText('5/100')).toBeTruthy();
  });

  it('applies no warning class when far from limit', () => {
    const { container } = render(<CharacterCounter current={10} max={100} />);
    expect(container.firstElementChild?.className).toContain('char-counter');
    expect(container.firstElementChild?.className).not.toContain('char-counter-warn');
    expect(container.firstElementChild?.className).not.toContain('char-counter-over');
  });

  it('applies warning class near limit', () => {
    const { container } = render(<CharacterCounter current={95} max={100} />);
    expect(container.firstElementChild?.className).toContain('char-counter-warn');
  });

  it('applies over class when exceeding limit', () => {
    const { container } = render(<CharacterCounter current={105} max={100} />);
    expect(container.firstElementChild?.className).toContain('char-counter-over');
  });

  it('has aria-live polite for screen reader updates', () => {
    render(<CharacterCounter current={50} max={100} />);
    const counter = screen.getByRole('status');
    expect(counter.getAttribute('aria-live')).toBe('polite');
  });

  it('accepts custom className', () => {
    const { container } = render(<CharacterCounter current={0} max={50} className="custom" />);
    expect(container.firstElementChild?.className).toContain('custom');
  });
});
