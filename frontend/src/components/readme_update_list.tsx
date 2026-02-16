import { Readme_updateItem } from './readme_update_item';

interface Item { title: string; value: string; description?: string; }

export function Readme_updateList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Readme_updateItem key={i} {...item} />)}
    </div>
  );
}
