import { useEffect, useRef, useCallback, memo } from 'react';
import { useFocusReturn } from '../hooks/useFocusReturn';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = memo(function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  useFocusReturn(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      confirmBtnRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  }, [onCancel]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <h3 id="confirm-dialog-title">{title}</h3>
      <p id="confirm-dialog-message">{message}</p>
      <div className="confirm-dialog-actions">
        <button className="confirm-dialog-cancel" onClick={onCancel}>{cancelLabel}</button>
        <button ref={confirmBtnRef} className="confirm-dialog-confirm" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </dialog>
  );
});
