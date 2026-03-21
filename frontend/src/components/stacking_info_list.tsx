import { Stacking_infoItem } from './stacking_info_item';

interface Item { title: string; value: string; description?: string; }

export function Stacking_infoList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Stacking_infoItem key={i} {...item} />)}
    </div>
  );
}
