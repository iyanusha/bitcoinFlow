import { Api_docsItem } from './api_docs_item';

interface Item { title: string; value: string; description?: string; }

export function Api_docsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Api_docsItem key={i} {...item} />)}
    </div>
  );
}
