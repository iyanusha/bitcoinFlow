import { memo } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  decorative?: boolean;
}

export const Spinner = memo(function Spinner({ size = 'md', color, label = 'Loading', decorative = false }: SpinnerProps) {
  const px = { sm: 16, md: 24, lg: 40 }[size];
  const borderWidth = size === 'sm' ? 2 : 3;
  const spinnerColor = color || 'var(--accent, #667eea)';

  return (
    <div
      className="spinner"
      role={decorative ? 'presentation' : 'status'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      style={{
        width: px,
        height: px,
        border: `${borderWidth}px solid ${spinnerColor}20`,
        borderTopColor: spinnerColor,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        display: 'inline-block',
      }}
    />
  );
});
