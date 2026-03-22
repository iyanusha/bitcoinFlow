import { describe, expect, it } from 'vitest';
import type {
  VaultStats,
  TransactionRecord,
  TransactionStatus,
  UserPosition,
  CooldownInfo,
  ToastMessage,
  ErrorCode,
  VaultConfig,
  ExchangeRate,
  FormField,
  LoadingState,
} from '../types';

describe('type guard checks', () => {
  it('TransactionStatus is a valid union type', () => {
    const statuses: TransactionStatus[] = ['pending', 'confirmed', 'failed'];
    expect(statuses).toHaveLength(3);
  });

  it('LoadingState is a valid union type', () => {
    const states: LoadingState[] = ['idle', 'loading', 'success', 'error'];
    expect(states).toHaveLength(4);
  });

  it('ErrorCode is a valid union type', () => {
    const codes: ErrorCode[] = [
      'NOT_AUTHORIZED',
      'INSUFFICIENT_BALANCE',
      'INVALID_AMOUNT',
      'STACKING_ERROR',
      'SBTC_TRANSFER_FAILED',
      'VAULT_PAUSED',
      'COOLDOWN_ACTIVE',
    ];
    expect(codes).toHaveLength(7);
  });

  it('VaultStats has all expected keys', () => {
    const keys: (keyof VaultStats)[] = [
      'totalDeposits', 'totalRewards', 'stxBalance',
      'depositCount', 'withdrawCount', 'isPaused',
      'userBalance', 'currentBlock',
    ];
    expect(keys).toHaveLength(8);
  });

  it('TransactionRecord has all expected keys', () => {
    const keys: (keyof TransactionRecord)[] = [
      'txId', 'type', 'amount', 'status', 'timestamp',
    ];
    expect(keys).toHaveLength(5);
  });

  it('UserPosition has all expected keys', () => {
    const keys: (keyof UserPosition)[] = [
      'depositedAmount', 'flowTokenBalance', 'pendingRewards',
      'lastDepositTime', 'sharePct',
    ];
    expect(keys).toHaveLength(5);
  });

  it('ToastMessage has required and optional keys', () => {
    const toast: ToastMessage = {
      id: '1',
      type: 'success',
      message: 'Done',
    };
    expect(toast.id).toBe('1');
    expect(toast.txId).toBeUndefined();
  });

  it('CooldownInfo has both fields', () => {
    const cd: CooldownInfo = { blocksRemaining: 3, isExpired: false };
    expect(cd.blocksRemaining).toBe(3);
    expect(cd.isExpired).toBe(false);
  });

  it('ExchangeRate has rate and formatted fields', () => {
    const rate: ExchangeRate = { rate: 1000000, formattedRate: '1.000000' };
    expect(rate.rate).toBe(1000000);
    expect(rate.formattedRate).toBe('1.000000');
  });

  it('VaultConfig has all network config fields', () => {
    const config: VaultConfig = {
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'flow-vault',
      network: 'testnet',
      explorerUrl: 'https://explorer.hiro.so',
      clarityVersion: 3,
    };
    expect(config.clarityVersion).toBe(3);
  });

  it('FormField has value, error, and touched', () => {
    const field: FormField = { value: '100', error: null, touched: true };
    expect(field.touched).toBe(true);
    expect(field.error).toBeNull();
  });
});
