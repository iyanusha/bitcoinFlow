import { ContributingItem } from './contributing_item';

interface Item { title: string; value: string; description?: string; }

export function ContributingList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <ContributingItem key={i} {...item} />)}
    </div>
  );
}
