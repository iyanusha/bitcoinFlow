import { High_contrastItem } from './high_contrast_item';

interface Item { title: string; value: string; description?: string; }

export function High_contrastList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <High_contrastItem key={i} {...item} />)}
    </div>
  );
}
