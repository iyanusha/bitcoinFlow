import { Rewards_calcItem } from './rewards_calc_item';

interface Item { title: string; value: string; description?: string; }

export function Rewards_calcList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Rewards_calcItem key={i} {...item} />)}
    </div>
  );
}
