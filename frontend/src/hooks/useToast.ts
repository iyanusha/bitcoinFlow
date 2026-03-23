import { useState, useCallback, useRef } from 'react';
import type { ToastMessage } from '../types';

const DEFAULT_DURATION = 5000;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${++counterRef.current}`;
    const duration = toast.duration ?? DEFAULT_DURATION;
    const newToast: ToastMessage = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((message: string, txId?: string) => {
    return addToast({ type: 'success', message, txId });
  }, [addToast]);

  const error = useCallback((message: string) => {
    return addToast({ type: 'error', message, duration: 8000 });
  }, [addToast]);

  const info = useCallback((message: string) => {
    return addToast({ type: 'info', message });
  }, [addToast]);

  return { toasts, addToast, removeToast, success, error, info };
}
