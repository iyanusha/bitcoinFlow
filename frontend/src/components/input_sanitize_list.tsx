import { Input_sanitizeItem } from './input_sanitize_item';

interface Item { title: string; value: string; description?: string; }

export function Input_sanitizeList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Input_sanitizeItem key={i} {...item} />)}
    </div>
  );
}
