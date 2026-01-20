import { Deposit_confirmItem } from './deposit_confirm_item';

interface Item { title: string; value: string; description?: string; }

export function Deposit_confirmList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Deposit_confirmItem key={i} {...item} />)}
    </div>
  );
}
