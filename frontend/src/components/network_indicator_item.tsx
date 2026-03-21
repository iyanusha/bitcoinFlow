interface Network_indicatorItemProps { title: string; value: string; description?: string; }

export function Network_indicatorItem({ title, value, description }: Network_indicatorItemProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}>{title}</div>
        {description && <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{description}</div>}
      </div>
      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937' }}>{value}</div>
    </div>
  );
}
