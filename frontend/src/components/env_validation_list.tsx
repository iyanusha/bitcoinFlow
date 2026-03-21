import { Env_validationItem } from './env_validation_item';

interface Item { title: string; value: string; description?: string; }

export function Env_validationList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Env_validationItem key={i} {...item} />)}
    </div>
  );
}
