import { Component_docsItem } from './component_docs_item';

interface Item { title: string; value: string; description?: string; }

export function Component_docsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Component_docsItem key={i} {...item} />)}
    </div>
  );
}
