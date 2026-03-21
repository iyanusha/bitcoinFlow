import { Contract_tests_v2Item } from './contract_tests_v2_item';

interface Item { title: string; value: string; description?: string; }

export function Contract_tests_v2List({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Contract_tests_v2Item key={i} {...item} />)}
    </div>
  );
}
