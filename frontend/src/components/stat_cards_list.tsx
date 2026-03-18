import { Stat_cardsItem } from './stat_cards_item';

interface Item { title: string; value: string; description?: string; }

export function Stat_cardsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Stat_cardsItem key={i} {...item} />)}
    </div>
  );
}
