interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; color?: string; }

export function Spinner({ size = 'md', color = '#667eea' }: SpinnerProps) {
  const px = { sm: 16, md: 24, lg: 40 }[size];
  return (
    <div className="spinner" role="status" aria-label="Loading" style={{
      width: px, height: px,
      border: `3px solid ${color}20`, borderTopColor: color,
      borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block',
    }} />
  );
}
