import { useEffect, useRef } from 'react';

/**
 * Like useEffect but skips the initial render.
 * Fires only when dependencies change after mount.
 */
export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
