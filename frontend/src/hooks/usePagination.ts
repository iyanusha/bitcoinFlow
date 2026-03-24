import { useState, useMemo, useCallback } from 'react';

interface PaginationResult<T> {
  /** Current page items */
  pageItems: T[];
  /** Current page number (0-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Whether there is a previous page */
  hasPrev: boolean;
  /** Go to the next page */
  nextPage: () => void;
  /** Go to the previous page */
  prevPage: () => void;
  /** Go to a specific page */
  goToPage: (page: number) => void;
  /** Reset to first page */
  reset: () => void;
}

/**
 * Generic pagination hook for any array of items.
 */
export function usePagination<T>(items: T[], pageSize: number): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / pageSize)),
    [items.length, pageSize]
  );

  // Clamp current page if items shrink
  const clampedPage = Math.min(currentPage, totalPages - 1);
  if (clampedPage !== currentPage) {
    setCurrentPage(clampedPage);
  }

  const pageItems = useMemo(() => {
    const start = clampedPage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, clampedPage, pageSize]);

  const hasNext = clampedPage < totalPages - 1;
  const hasPrev = clampedPage > 0;

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  const reset = useCallback(() => setCurrentPage(0), []);

  return {
    pageItems,
    currentPage: clampedPage,
    totalPages,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}
