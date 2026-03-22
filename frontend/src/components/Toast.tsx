import { useEffect, useRef } from 'react';
import type { ToastMessage } from '../types';
import { getTxExplorerUrl } from '../lib/stacks';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const DEFAULT_DURATION = 5000;

export function Toast({ toast, onDismiss }: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const duration = toast.duration ?? DEFAULT_DURATION;
    if (duration <= 0) return;

    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`toast toast-${toast.type}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      <span className="toast-message">{toast.message}</span>
      {toast.txId && (
        <a
          href={getTxExplorerUrl(toast.txId)}
          target="_blank"
          rel="noopener noreferrer"
          className="toast-link"
        >
          View TX
        </a>
      )}
      <button
        className="toast-dismiss"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        &times;
      </button>
    </div>
  );
}
