import { useEffect } from 'react';

/**
 * Warn users before leaving the page if the form has unsaved changes.
 * Shows the browser's native "Leave page?" confirmation dialog.
 */
export function useFormDirtyWarning(isDirty: boolean, message?: string): void {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      if (message) {
        e.returnValue = message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, message]);
}
