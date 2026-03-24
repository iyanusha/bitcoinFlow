import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Balance" value="1,000 STX" />);
    expect(screen.getByText('Balance')).toBeTruthy();
    expect(screen.getByText('1,000 STX')).toBeTruthy();
  });

  it('applies loading class when loading', () => {
    const { container } = render(<StatCard title="Test" value="0" loading={true} />);
    expect(container.firstElementChild?.className).toContain('loading');
  });

  it('has no loading class when not loading', () => {
    const { container } = render(<StatCard title="Test" value="0" loading={false} />);
    expect(container.firstElementChild?.className).not.toContain('loading');
  });

  it('generates default aria-label from title and value', () => {
    const { container } = render(<StatCard title="Deposits" value="42" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Deposits: 42');
  });

  it('uses custom aria-label when provided', () => {
    const { container } = render(<StatCard title="X" value="Y" ariaLabel="Custom label" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Custom label');
  });
});
