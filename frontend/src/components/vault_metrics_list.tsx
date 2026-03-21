import { Vault_metricsItem } from './vault_metrics_item';

interface Item { title: string; value: string; description?: string; }

export function Vault_metricsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Vault_metricsItem key={i} {...item} />)}
    </div>
  );
}
