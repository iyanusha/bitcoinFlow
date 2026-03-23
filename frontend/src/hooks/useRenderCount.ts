import { useRef } from 'react';

/**
 * Track the number of times a component has rendered.
 * Useful for debugging unnecessary re-renders in development.
 */
export function useRenderCount(componentName?: string): number {
  const count = useRef(0);
  count.current += 1;

  if (import.meta.env.DEV && componentName) {
    console.debug(`[RenderCount] ${componentName}: ${count.current}`);
  }

  return count.current;
}
