import { Keyboard_shortcutsItem } from './keyboard_shortcuts_item';

interface Item { title: string; value: string; description?: string; }

export function Keyboard_shortcutsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Keyboard_shortcutsItem key={i} {...item} />)}
    </div>
  );
}
