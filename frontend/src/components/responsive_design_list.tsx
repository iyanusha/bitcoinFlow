import { Responsive_designItem } from './responsive_design_item';

interface Item { title: string; value: string; description?: string; }

export function Responsive_designList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Responsive_designItem key={i} {...item} />)}
    </div>
  );
}
