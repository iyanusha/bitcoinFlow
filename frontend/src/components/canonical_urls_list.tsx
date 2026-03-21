import { Canonical_urlsItem } from './canonical_urls_item';

interface Item { title: string; value: string; description?: string; }

export function Canonical_urlsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Canonical_urlsItem key={i} {...item} />)}
    </div>
  );
}
