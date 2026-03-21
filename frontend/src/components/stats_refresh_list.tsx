import { Stats_refreshItem } from './stats_refresh_item';

interface Item { title: string; value: string; description?: string; }

export function Stats_refreshList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Stats_refreshItem key={i} {...item} />)}
    </div>
  );
}
