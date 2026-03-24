import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualList } from '../VirtualList';

describe('VirtualList', () => {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`);
  const renderItem = (item: string) => <span>{item}</span>;

  it('renders only visible items', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        containerHeight={200}
        renderItem={renderItem}
      />,
    );
    const listItems = container.querySelectorAll('[role="listitem"]');
    // Should render visibleCount + 2*overscan items, not all 100
    expect(listItems.length).toBeLessThan(100);
  });

  it('has role=list on container', () => {
    render(
      <VirtualList
        items={items}
        itemHeight={40}
        containerHeight={200}
        renderItem={renderItem}
      />,
    );
    expect(screen.getByRole('list')).toBeTruthy();
  });

  it('renders first visible item', () => {
    render(
      <VirtualList
        items={items}
        itemHeight={40}
        containerHeight={200}
        renderItem={renderItem}
      />,
    );
    expect(screen.getByText('Item 0')).toBeTruthy();
  });

  it('handles empty list', () => {
    const { container } = render(
      <VirtualList
        items={[]}
        itemHeight={40}
        containerHeight={200}
        renderItem={renderItem}
      />,
    );
    const listItems = container.querySelectorAll('[role="listitem"]');
    expect(listItems.length).toBe(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <VirtualList
        items={items}
        itemHeight={40}
        containerHeight={200}
        renderItem={renderItem}
        className="custom-list"
      />,
    );
    expect(container.firstElementChild?.className).toContain('custom-list');
  });
});
