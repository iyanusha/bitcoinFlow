import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { LazyImage } from '../LazyImage';

describe('LazyImage', () => {
  let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;

  beforeEach(() => {
    const MockObserver = vi.fn((callback: (entries: Partial<IntersectionObserverEntry>[]) => void) => {
      observerCallback = callback;
      return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
    });
    vi.stubGlobal('IntersectionObserver', MockObserver);
  });

  it('renders placeholder before entering viewport', () => {
    const { container } = render(
      <LazyImage src="/test.png" alt="Test" width={100} height={100} />,
    );
    expect(container.querySelector('.lazy-image-placeholder')).toBeTruthy();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders custom placeholder', () => {
    const { getByText } = render(
      <LazyImage src="/test.png" alt="Test" placeholder={<span>Loading...</span>} />,
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <LazyImage src="/test.png" alt="Test" className="hero-img" />,
    );
    expect(container.firstElementChild?.className).toContain('hero-img');
  });
});
