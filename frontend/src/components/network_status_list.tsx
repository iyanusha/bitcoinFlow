import { Network_statusItem } from './network_status_item';

interface Item { title: string; value: string; description?: string; }

export function Network_statusList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Network_statusItem key={i} {...item} />)}
    </div>
  );
}
