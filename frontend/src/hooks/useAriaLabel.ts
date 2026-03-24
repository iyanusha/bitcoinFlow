import { useMemo } from 'react';

interface UseAriaLabelOptions {
  /** Base label text */
  label: string;
  /** Current state value to append */
  state?: string;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Count to include */
  count?: number;
}

export function useAriaLabel({
  label,
  state,
  loading,
  error,
  count,
}: UseAriaLabelOptions): string {
  return useMemo(() => {
    const parts = [label];

    if (loading) {
      parts.push('loading');
    } else if (error) {
      parts.push(`error: ${error}`);
    } else if (state) {
      parts.push(state);
    }

    if (count !== undefined) {
      parts.push(`${count} items`);
    }

    return parts.join(', ');
  }, [label, state, loading, error, count]);
}
