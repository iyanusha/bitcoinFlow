import { Dashboard_layoutItem } from './dashboard_layout_item';

interface Item { title: string; value: string; description?: string; }

export function Dashboard_layoutList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Dashboard_layoutItem key={i} {...item} />)}
    </div>
  );
}
