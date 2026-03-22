import { memo } from 'react';

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

export const SkeletonCard = memo(function SkeletonCard({ lines = 2, className = 'stat-card' }: SkeletonCardProps) {
  return (
    <div className={className} role="status" aria-label="Loading content">
      <div className="skeleton" style={{ width: '60%', height: 14, marginBottom: 8, margin: '0 auto 8px' }} />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className="skeleton" aria-hidden="true" style={{ width: `${80 - i * 10}%`, height: 28, margin: '0 auto' }} />
      ))}
    </div>
  );
});
