import { memo } from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export const CharacterCounter = memo(function CharacterCounter({
  current,
  max,
  className = '',
}: CharacterCounterProps) {
  const remaining = max - current;
  const isNearLimit = remaining <= Math.ceil(max * 0.1);
  const isOverLimit = remaining < 0;

  const statusClass = isOverLimit
    ? 'char-counter-over'
    : isNearLimit
      ? 'char-counter-warn'
      : '';

  return (
    <span
      className={`char-counter ${statusClass} ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {current}/{max}
    </span>
  );
});
