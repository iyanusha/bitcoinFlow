import { useState, useCallback, useRef, useEffect } from 'react';

interface UseListNavigationOptions {
  /** Total number of items in the list */
  itemCount: number;
  /** Whether navigation is enabled */
  enabled?: boolean;
  /** Callback when an item is activated (Enter pressed) */
  onActivate?: (index: number) => void;
}

interface UseListNavigationResult {
  /** Currently focused item index, -1 if none */
  activeIndex: number;
  /** Props to spread on the list container */
  listProps: {
    role: string;
    tabIndex: number;
    onKeyDown: (e: React.KeyboardEvent) => void;
    'aria-activedescendant': string | undefined;
  };
  /** Get ID for an item at a given index */
  getItemId: (index: number) => string;
  /** Whether a specific index is the active one */
  isActive: (index: number) => boolean;
}

let idCounter = 0;

export function useListNavigation({
  itemCount,
  enabled = true,
  onActivate,
}: UseListNavigationOptions): UseListNavigationResult {
  const [activeIndex, setActiveIndex] = useState(-1);
  const prefixRef = useRef(`list-nav-${++idCounter}`);

  useEffect(() => {
    if (activeIndex >= itemCount) {
      setActiveIndex(Math.max(0, itemCount - 1));
    }
  }, [itemCount, activeIndex]);

  const getItemId = useCallback(
    (index: number) => `${prefixRef.current}-item-${index}`,
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev < itemCount - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : itemCount - 1));
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(itemCount - 1);
          break;
        case 'Enter':
          if (activeIndex >= 0 && onActivate) {
            e.preventDefault();
            onActivate(activeIndex);
          }
          break;
      }
    },
    [enabled, itemCount, activeIndex, onActivate]
  );

  const isActive = useCallback(
    (index: number) => index === activeIndex,
    [activeIndex]
  );

  return {
    activeIndex,
    listProps: {
      role: 'listbox',
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      'aria-activedescendant': activeIndex >= 0 ? getItemId(activeIndex) : undefined,
    },
    getItemId,
    isActive,
  };
}
