import { useEffect, useRef } from 'react';
import { useFocusReturn } from '../hooks/useFocusReturn';

interface ShortcutEntry {
  keys: string[];
  description: string;
}

const SHORTCUTS: ShortcutEntry[] = [
  { keys: ['Esc'], description: 'Dismiss error messages' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['Tab'], description: 'Navigate between elements' },
  { keys: ['Enter'], description: 'Activate focused button or link' },
  { keys: ['Space'], description: 'Toggle checkboxes and buttons' },
];

interface KeyboardShortcutHelpProps {
  open: boolean;
  onClose: () => void;
}

export function KeyboardShortcutHelp({ open, onClose }: KeyboardShortcutHelpProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useFocusReturn(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeBtnRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="shortcut-help-dialog"
      onClose={onClose}
      aria-labelledby="shortcut-help-title"
      aria-modal="true"
    >
      <div className="shortcut-help-header">
        <h3 id="shortcut-help-title">Keyboard Shortcuts</h3>
        <button
          ref={closeBtnRef}
          className="shortcut-help-close"
          onClick={onClose}
          aria-label="Close keyboard shortcuts"
        >
          ✕
        </button>
      </div>
      <table className="shortcut-help-table" role="presentation">
        <tbody>
          {SHORTCUTS.map((shortcut) => (
            <tr key={shortcut.description}>
              <td className="shortcut-keys">
                {shortcut.keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </td>
              <td className="shortcut-desc">{shortcut.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </dialog>
  );
}
