import { Mock_dataItem } from './mock_data_item';

interface Item { title: string; value: string; description?: string; }

export function Mock_dataList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Mock_dataItem key={i} {...item} />)}
    </div>
  );
}
