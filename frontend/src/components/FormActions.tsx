import { memo } from 'react';

interface FormActionsProps {
  submitLabel?: string;
  resetLabel?: string;
  onSubmit?: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  showReset?: boolean;
  className?: string;
}

export const FormActions = memo(function FormActions({
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  onSubmit,
  onReset,
  isSubmitting = false,
  isDisabled = false,
  showReset = true,
  className = '',
}: FormActionsProps) {
  return (
    <div className={`form-actions ${className}`.trim()}>
      <button
        type="button"
        className="form-submit-btn"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : submitLabel}
      </button>
      {showReset && onReset && (
        <button
          type="button"
          className="form-reset-btn"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
});
