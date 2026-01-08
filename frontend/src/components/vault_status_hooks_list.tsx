import { Vault_status_hooksItem } from './vault_status_hooks_item';

interface Item { title: string; value: string; description?: string; }

export function Vault_status_hooksList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Vault_status_hooksItem key={i} {...item} />)}
    </div>
  );
}
