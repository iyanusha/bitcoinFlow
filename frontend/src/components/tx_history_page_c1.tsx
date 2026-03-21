import type { ReactNode } from 'react';
interface Props { children?: ReactNode; title?: string; loading?: boolean; }
export function Tx_history_pageC1({ children, title, loading }: Props) {
  if (loading) return <div className="skeleton" style={{ height: 100, borderRadius: 8 }} />;
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', border: '1px solid #e5e7eb' }}>
      {title && <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1f2937' }}>{title}</h3>}
      {children}
    </div>
  );
}
