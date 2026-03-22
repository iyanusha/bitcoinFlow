import type { ToastMessage } from '../types';
import { getTxExplorerUrl } from '../lib/stacks';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
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
