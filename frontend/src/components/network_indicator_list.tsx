import { Network_indicatorItem } from './network_indicator_item';

interface Item { title: string; value: string; description?: string; }

export function Network_indicatorList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Network_indicatorItem key={i} {...item} />)}
    </div>
  );
}
