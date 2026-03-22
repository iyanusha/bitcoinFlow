interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  type?: 'error' | 'warning' | 'info';
}

export function ErrorMessage({ message, onDismiss, type = 'error' }: ErrorMessageProps) {
  const colors = {
    error: { bg: 'var(--error-bg, #fee2e2)', fg: 'var(--error-text, #dc2626)' },
    warning: { bg: 'var(--warning-bg, #fef3c7)', fg: 'var(--warning-text, #d97706)' },
    info: { bg: 'var(--info-bg, #dbeafe)', fg: 'var(--info-text, #2563eb)' },
  };
  const c = colors[type];
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      style={{ background: c.bg, color: c.fg, padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss message"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: c.fg }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
