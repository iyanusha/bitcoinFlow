import React, { useState } from 'react';
import type { Transaction } from '../types/transaction';
import { TxService } from '../services/txService';

interface TxExportButtonProps {
  transactions: Transaction[];
  filename?: string;
}

export function TxExportButton({ transactions, filename = 'transactions.csv' }: TxExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (transactions.length === 0) return;
    setExporting(true);
    try {
      const csv = TxService.instance.exportToCSV(transactions);
      TxService.instance.downloadCSV(csv, filename);
    } finally {
      setExporting(false);
    }
  };

  const isEmpty = transactions.length === 0;

  return (
    <button
      type="button"
      className="tx-export-btn"
      onClick={handleExport}
      disabled={isEmpty || exporting}
      aria-label={isEmpty ? 'No transactions to export' : `Export ${transactions.length} transactions to CSV`}
      title={isEmpty ? 'No transactions to export' : 'Download as CSV'}
      aria-busy={exporting}
    >
      <span className="tx-export-icon" aria-hidden="true">⬇</span>
      {exporting ? 'Exporting…' : 'Export CSV'}
    </button>
  );
}
