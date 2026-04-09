import type { Transaction, TxType } from '../types/transaction';
import { API_URL } from '../lib/stacks';

function mapHiroTxToTransaction(tx: Record<string, unknown>): Transaction {
  const txType = detectTxType(tx);
  const events = (tx.events as Record<string, unknown>[] | undefined) ?? [];

  let amount = 0;
  for (const event of events) {
    if (event.event_type === 'stx_asset') {
      const asset = event.data as Record<string, unknown>;
      amount = parseInt(String(asset.amount ?? '0'), 10);
      break;
    }
  }

  return {
    id: String(tx.tx_id ?? ''),
    type: txType,
    amount,
    fee: parseInt(String(tx.fee_rate ?? '0'), 10),
    status: mapStatus(String(tx.tx_status ?? 'pending')),
    blockHeight: parseInt(String(tx.block_height ?? '0'), 10),
    timestamp: parseInt(String(tx.burn_block_time ?? '0'), 10) * 1000,
    txHash: String(tx.tx_id ?? ''),
    sender: String(tx.sender_address ?? ''),
    recipient: extractRecipient(tx),
  };
}

function mapStatus(raw: string): 'confirmed' | 'pending' | 'failed' {
  if (raw === 'success') return 'confirmed';
  if (raw === 'abort_by_response' || raw === 'abort_by_post_condition') return 'failed';
  return 'pending';
}

function detectTxType(tx: Record<string, unknown>): TxType {
  const fnName = String(
    (tx.contract_call as Record<string, unknown> | undefined)?.function_name ?? ''
  );
  if (fnName === 'deposit') return 'deposit';
  if (fnName === 'withdraw') return 'withdrawal';
  if (fnName === 'lock-vault') return 'lock';
  if (fnName === 'unlock-vault') return 'unlock';
  if (fnName === 'claim-rewards' || fnName === 'distribute-rewards') return 'reward';
  return 'deposit';
}

function extractRecipient(tx: Record<string, unknown>): string | undefined {
  const events = (tx.events as Record<string, unknown>[] | undefined) ?? [];
  for (const event of events) {
    if (event.event_type === 'stx_asset') {
      const data = event.data as Record<string, unknown>;
      if (data.recipient) return String(data.recipient);
    }
  }
  return undefined;
}

export class TxService {
  private static _instance: TxService | null = null;

  static get instance(): TxService {
    if (!TxService._instance) {
      TxService._instance = new TxService();
    }
    return TxService._instance;
  }

  async fetchTxHistory(
    address: string,
    limit = 20,
    offset = 0
  ): Promise<Transaction[]> {
    const url = `${API_URL}/extended/v1/address/${address}/transactions?limit=${limit}&offset=${offset}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Failed to fetch tx history: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const results: Record<string, unknown>[] = json.results ?? [];
    return results.map(mapHiroTxToTransaction);
  }

  async fetchTxDetails(txHash: string): Promise<Transaction> {
    const url = `${API_URL}/extended/v1/tx/${txHash}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    if (res.status === 404) {
      throw new Error(`Transaction not found: ${txHash}`);
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch tx details: ${res.status} ${res.statusText}`);
    }

    const tx = await res.json();
    return mapHiroTxToTransaction(tx);
  }

  exportToCSV(transactions: Transaction[]): string {
    const header = 'Date,Type,Amount STX,Fee STX,Status,TxHash';
    const rows = transactions.map(tx => {
      const date = new Date(tx.timestamp).toISOString().split('T')[0];
      const amountSTX = (tx.amount / 1_000_000).toFixed(6);
      const feeSTX = (tx.fee / 1_000_000).toFixed(6);
      return `${date},${tx.type},${amountSTX},${feeSTX},${tx.status},${tx.txHash}`;
    });
    return [header, ...rows].join('\n');
  }

  downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
