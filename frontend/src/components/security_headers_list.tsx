import { Security_headersItem } from './security_headers_item';

interface Item { title: string; value: string; description?: string; }

export function Security_headersList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Security_headersItem key={i} {...item} />)}
    </div>
  );
}
