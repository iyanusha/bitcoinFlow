import { Focus_managementItem } from './focus_management_item';

interface Item { title: string; value: string; description?: string; }

export function Focus_managementList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Focus_managementItem key={i} {...item} />)}
    </div>
  );
}
