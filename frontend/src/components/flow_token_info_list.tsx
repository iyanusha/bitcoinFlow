import { Flow_token_infoItem } from './flow_token_info_item';

interface Item { title: string; value: string; description?: string; }

export function Flow_token_infoList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Flow_token_infoItem key={i} {...item} />)}
    </div>
  );
}
