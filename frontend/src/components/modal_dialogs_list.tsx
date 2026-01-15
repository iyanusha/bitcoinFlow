import { Modal_dialogsItem } from './modal_dialogs_item';

interface Item { title: string; value: string; description?: string; }

export function Modal_dialogsList({ items }: { items: Item[] }) {
  if (!items.length) return <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No items</div>;
  return (
    <div>
      {items.map((item, i) => <Modal_dialogsItem key={i} {...item} />)}
    </div>
  );
}
