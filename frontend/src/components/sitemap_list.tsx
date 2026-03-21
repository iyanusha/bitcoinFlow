import { SitemapItem } from './sitemap_item';

interface Item { title: string; value: string; description?: string; }

export function SitemapList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <SitemapItem key={i} {...item} />)}
    </div>
  );
}
