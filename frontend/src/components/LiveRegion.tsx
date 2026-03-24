import type { ReactNode } from 'react';

interface LiveRegionProps {
  children: ReactNode;
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export function LiveRegion({
  children,
  priority = 'polite',
  atomic = true,
  className = 'sr-only',
}: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic={atomic}
      className={className}
    >
      {children}
    </div>
  );
}
