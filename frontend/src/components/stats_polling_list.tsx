import { Stats_pollingItem } from './stats_polling_item';

interface Item { title: string; value: string; description?: string; }

export function Stats_pollingList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Stats_pollingItem key={i} {...item} />)}
    </div>
  );
}
