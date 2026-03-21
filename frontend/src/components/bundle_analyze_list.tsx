import { Bundle_analyzeItem } from './bundle_analyze_item';

interface Item { title: string; value: string; description?: string; }

export function Bundle_analyzeList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Bundle_analyzeItem key={i} {...item} />)}
    </div>
  );
}
