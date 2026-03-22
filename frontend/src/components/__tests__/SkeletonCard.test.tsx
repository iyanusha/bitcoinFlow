import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonCard } from '../SkeletonCard';

describe('SkeletonCard', () => {
  it('renders with default stat-card class', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('.stat-card')).toBeTruthy();
  });

  it('accepts custom className', () => {
    const { container } = render(<SkeletonCard className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });

  it('renders default 2 skeleton lines', () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBe(2);
  });

  it('renders custom number of lines', () => {
    const { container } = render(<SkeletonCard lines={4} />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBe(4);
  });

  it('renders minimum 1 skeleton line', () => {
    const { container } = render(<SkeletonCard lines={1} />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBe(1);
  });
});
