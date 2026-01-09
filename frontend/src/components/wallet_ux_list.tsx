import { Wallet_uxItem } from './wallet_ux_item';

interface Item { title: string; value: string; description?: string; }

export function Wallet_uxList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Wallet_uxItem key={i} {...item} />)}
    </div>
  );
}
