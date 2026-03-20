import { Empty_statesItem } from './empty_states_item';

interface Item { title: string; value: string; description?: string; }

export function Empty_statesList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Empty_statesItem key={i} {...item} />)}
    </div>
  );
}
