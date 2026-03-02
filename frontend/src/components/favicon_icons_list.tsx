import { Favicon_iconsItem } from './favicon_icons_item';

interface Item { title: string; value: string; description?: string; }

export function Favicon_iconsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Favicon_iconsItem key={i} {...item} />)}
    </div>
  );
}
