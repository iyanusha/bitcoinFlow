import { Code_splittingItem } from './code_splitting_item';

interface Item { title: string; value: string; description?: string; }

export function Code_splittingList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Code_splittingItem key={i} {...item} />)}
    </div>
  );
}
