import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('renders default "Loading..." message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders custom message', () => {
    render(<LoadingScreen message="Fetching vault data" />);
    expect(screen.getByText('Fetching vault data')).toBeTruthy();
  });

  it('renders a spinner', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('uses centered flex layout', () => {
    const { container } = render(<LoadingScreen />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.display).toBe('flex');
    expect(div.style.alignItems).toBe('center');
    expect(div.style.justifyContent).toBe('center');
  });
});
