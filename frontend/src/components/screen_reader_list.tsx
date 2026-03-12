import { Screen_readerItem } from './screen_reader_item';

interface Item { title: string; value: string; description?: string; }

export function Screen_readerList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Screen_readerItem key={i} {...item} />)}
    </div>
  );
}
