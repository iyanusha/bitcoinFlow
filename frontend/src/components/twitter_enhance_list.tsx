import { Twitter_enhanceItem } from './twitter_enhance_item';

interface Item { title: string; value: string; description?: string; }

export function Twitter_enhanceList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Twitter_enhanceItem key={i} {...item} />)}
    </div>
  );
}
