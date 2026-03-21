import { Test_setupItem } from './test_setup_item';

interface Item { title: string; value: string; description?: string; }

export function Test_setupList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Test_setupItem key={i} {...item} />)}
    </div>
  );
}
