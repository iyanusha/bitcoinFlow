import { Seo_meta_tagsItem } from './seo_meta_tags_item';

interface Item { title: string; value: string; description?: string; }

export function Seo_meta_tagsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Seo_meta_tagsItem key={i} {...item} />)}
    </div>
  );
}
