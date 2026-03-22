import type { ReactNode } from 'react';

interface FocusRingProps {
  children: ReactNode;
  className?: string;
}

export function FocusRing({ children, className = '' }: FocusRingProps) {
  return (
    <div className={`focus-ring-container ${className}`.trim()}>
      {children}
    </div>
  );
}
