import { useState, useCallback, useRef, useEffect } from 'react';

interface UseRovingTabIndexOptions {
  /** Total number of focusable items */
  itemCount: number;
  /** Whether the roving tab index is enabled */
  enabled?: boolean;
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
}

interface UseRovingTabIndexResult {
  /** Index of the currently focused item */
  focusedIndex: number;
  /** Get tabIndex value for an item */
  getTabIndex: (index: number) => 0 | -1;
  /** Handle keydown on the container */
  onKeyDown: (e: React.KeyboardEvent) => void;
  /** Set focus to a specific index */
  setFocusedIndex: (index: number) => void;
  /** Ref callback for registering items */
  registerItem: (index: number) => (el: HTMLElement | null) => void;
}

export function useRovingTabIndex({
  itemCount,
  enabled = true,
  orientation = 'horizontal',
}: UseRovingTabIndexOptions): UseRovingTabIndexResult {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    if (focusedIndex >= itemCount && itemCount > 0) {
      setFocusedIndex(itemCount - 1);
    }
  }, [itemCount, focusedIndex]);

  const focusItem = useCallback((index: number) => {
    const el = itemRefs.current.get(index);
    if (el) {
      el.focus();
      setFocusedIndex(index);
    }
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          focusItem((focusedIndex + 1) % itemCount);
          break;
        case prevKey:
          e.preventDefault();
          focusItem((focusedIndex - 1 + itemCount) % itemCount);
          break;
        case 'Home':
          e.preventDefault();
          focusItem(0);
          break;
        case 'End':
          e.preventDefault();
          focusItem(itemCount - 1);
          break;
      }
    },
    [enabled, itemCount, focusedIndex, orientation, focusItem]
  );

  const getTabIndex = useCallback(
    (index: number): 0 | -1 => (index === focusedIndex ? 0 : -1),
    [focusedIndex]
  );

  const registerItem = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      if (el) {
        itemRefs.current.set(index, el);
      } else {
        itemRefs.current.delete(index);
      }
    },
    []
  );

  return {
    focusedIndex,
    getTabIndex,
    onKeyDown,
    setFocusedIndex,
    registerItem,
  };
}
