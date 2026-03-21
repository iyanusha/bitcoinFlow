import { Image_optimizeItem } from './image_optimize_item';

interface Item { title: string; value: string; description?: string; }

export function Image_optimizeList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Image_optimizeItem key={i} {...item} />)}
    </div>
  );
}
