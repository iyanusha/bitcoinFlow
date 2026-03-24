interface EmptyTransactionsProps {
  filtered?: boolean;
}

export function EmptyTransactions({ filtered = false }: EmptyTransactionsProps) {
  return (
    <div className="tx-empty-state" role="status">
      <div className="tx-empty-icon" aria-hidden="true">
        {filtered ? '🔍' : '📋'}
      </div>
      <p className="tx-empty">
        {filtered
          ? 'No transactions match the selected filters.'
          : 'No transactions yet. Make a deposit or withdrawal to get started.'}
      </p>
    </div>
  );
}
