import { Env_docsItem } from './env_docs_item';

interface Item { title: string; value: string; description?: string; }

export function Env_docsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Env_docsItem key={i} {...item} />)}
    </div>
  );
}
