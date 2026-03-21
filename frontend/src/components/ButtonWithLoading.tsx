import type { ReactNode } from 'react';

interface Props {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  loadingText?: string;
  className?: string;
}

export function ButtonWithLoading({ loading, disabled, onClick, children, loadingText = 'Processing...', className }: Props) {
  return (
    <button onClick={onClick} disabled={disabled || loading} className={className}>
      {loading ? loadingText : children}
    </button>
  );
}
