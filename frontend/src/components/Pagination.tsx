interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Transaction pages">
      <button
        className="pagination-btn"
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous page"
      >
        &larr; Prev
      </button>
      <span className="pagination-info" aria-current="page">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        className="pagination-btn"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next page"
      >
        Next &rarr;
      </button>
    </nav>
  );
}
