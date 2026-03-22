import { useMediaQuery } from './useMediaQuery';

/**
 * Detects if the user prefers high contrast mode via
 * the forced-colors or prefers-contrast media queries.
 */
export function useHighContrast(): boolean {
  const forcedColors = useMediaQuery('(forced-colors: active)');
  const highContrast = useMediaQuery('(prefers-contrast: more)');
  return forcedColors || highContrast;
}
