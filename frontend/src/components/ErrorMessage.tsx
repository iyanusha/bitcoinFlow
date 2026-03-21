interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  type?: 'error' | 'warning' | 'info';
}

export function ErrorMessage({ message, onDismiss, type = 'error' }: ErrorMessageProps) {
  const colors = { error: { bg: '#fee2e2', fg: '#dc2626' }, warning: { bg: '#fef3c7', fg: '#d97706' }, info: { bg: '#dbeafe', fg: '#2563eb' } };
  const c = colors[type];
  return (
    <div style={{ background: c.bg, color: c.fg, padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{message}</span>
      {onDismiss && <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: c.fg }}>&times;</button>}
    </div>
  );
}
