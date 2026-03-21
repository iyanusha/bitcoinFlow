import { Toast_systemItem } from './toast_system_item';

interface Item { title: string; value: string; description?: string; }

export function Toast_systemList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Toast_systemItem key={i} {...item} />)}
    </div>
  );
}
