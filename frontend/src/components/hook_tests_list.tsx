import { Hook_testsItem } from './hook_tests_item';

interface Item { title: string; value: string; description?: string; }

export function Hook_testsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Hook_testsItem key={i} {...item} />)}
    </div>
  );
}
