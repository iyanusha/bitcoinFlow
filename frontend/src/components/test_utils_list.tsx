import { Test_utilsItem } from './test_utils_item';

interface Item { title: string; value: string; description?: string; }

export function Test_utilsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Test_utilsItem key={i} {...item} />)}
    </div>
  );
}
