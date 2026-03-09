import { Mobile_navItem } from './mobile_nav_item';

interface Item { title: string; value: string; description?: string; }

export function Mobile_navList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Mobile_navItem key={i} {...item} />)}
    </div>
  );
}
