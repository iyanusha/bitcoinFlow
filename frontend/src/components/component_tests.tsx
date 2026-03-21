import type { ReactNode } from 'react';

interface Component_testsProps {
  children?: ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  loading?: boolean;
  className?: string;
}

export function Component_tests({ children, variant = 'default', loading, className = '' }: Component_testsProps) {
  const styles = {
    default: { background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb' },
    primary: { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' },
    accent: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
  };
  if (loading) return <div className="skeleton" style={{ height: 120, borderRadius: 12 }} />;
  return (
    <div className={`component_tests ${className}`} style={{ ...styles[variant], borderRadius: '12px', padding: '1.25rem' }}>
      {children}
    </div>
  );
}
