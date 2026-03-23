import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

interface UseLazyLoadResult {
  ref: React.RefCallback<Element>;
  isVisible: boolean;
  hasLoaded: boolean;
}

/**
 * Lazy-load content when it enters the viewport.
 * Uses IntersectionObserver for efficient detection.
 */
export function useLazyLoad(options: UseLazyLoadOptions = {}): UseLazyLoadResult {
  const { rootMargin = '200px', threshold = 0, triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const ref = useCallback(
    (node: Element | null) => {
      cleanup();
      elementRef.current = node;

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          setIsVisible(visible);
          if (visible) {
            setHasLoaded(true);
            if (triggerOnce) {
              cleanup();
            }
          }
        },
        { rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [rootMargin, threshold, triggerOnce, cleanup],
  );

  useEffect(() => cleanup, [cleanup]);

  return { ref, isVisible, hasLoaded };
}
