import { Lazy_loadingItem } from './lazy_loading_item';

interface Item { title: string; value: string; description?: string; }

export function Lazy_loadingList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Lazy_loadingItem key={i} {...item} />)}
    </div>
  );
}
