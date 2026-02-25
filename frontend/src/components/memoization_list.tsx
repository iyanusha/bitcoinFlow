import { MemoizationItem } from './memoization_item';

interface Item { title: string; value: string; description?: string; }

export function MemoizationList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <MemoizationItem key={i} {...item} />)}
    </div>
  );
}
