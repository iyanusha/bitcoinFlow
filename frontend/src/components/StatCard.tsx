import { memo } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  loading?: boolean;
  ariaLabel?: string;
}

export const StatCard = memo(function StatCard({
  title,
  value,
  loading = false,
  ariaLabel,
}: StatCardProps) {
  return (
    <div
      className={`stat-card${loading ? ' loading' : ''}`}
      aria-label={ariaLabel ?? `${title}: ${value}`}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
});
