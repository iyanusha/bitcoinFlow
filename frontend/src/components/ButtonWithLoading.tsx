import type { ReactNode } from 'react';

interface Props {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  loadingText?: string;
  className?: string;
  type?: 'button' | 'submit';
}

export function ButtonWithLoading({
  loading,
  disabled,
  onClick,
  children,
  loadingText = 'Processing...',
  className,
  type = 'button',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className || ''} ${loading ? 'btn-loading' : ''}`.trim()}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      aria-label={loading ? loadingText : undefined}
    >
      {loading ? loadingText : children}
    </button>
  );
}
