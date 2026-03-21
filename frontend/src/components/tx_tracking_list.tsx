import { Tx_trackingItem } from './tx_tracking_item';

interface Item { title: string; value: string; description?: string; }

export function Tx_trackingList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Tx_trackingItem key={i} {...item} />)}
    </div>
  );
}
