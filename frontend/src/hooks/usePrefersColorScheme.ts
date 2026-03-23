import { useMediaQuery } from './useMediaQuery';

export type ColorScheme = 'light' | 'dark' | 'no-preference';

export function usePrefersColorScheme(): ColorScheme {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');

  if (prefersDark) return 'dark';
  if (prefersLight) return 'light';
  return 'no-preference';
}
