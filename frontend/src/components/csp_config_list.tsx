import { Csp_configItem } from './csp_config_item';

interface Item { title: string; value: string; description?: string; }

export function Csp_configList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Csp_configItem key={i} {...item} />)}
    </div>
  );
}
