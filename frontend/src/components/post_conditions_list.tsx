import { Post_conditionsItem } from './post_conditions_item';

interface Item { title: string; value: string; description?: string; }

export function Post_conditionsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Post_conditionsItem key={i} {...item} />)}
    </div>
  );
}
