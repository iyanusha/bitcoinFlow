import { Header_footerItem } from './header_footer_item';

interface Item { title: string; value: string; description?: string; }

export function Header_footerList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Header_footerItem key={i} {...item} />)}
    </div>
  );
}
